from datetime import datetime, timezone
from typing import Any, Dict, Optional
import json
import time
import httpx
from fastapi import FastAPI, Request, Response
from fastapi.responses import StreamingResponse

from token_inspector.models.event_schemas import InspectorSSEEvent
from token_inspector.models.inspection_record import InspectionRecord
from token_inspector.proxy.disconnect_handler import DisconnectHandler
from token_inspector.proxy.request_interceptor import RequestInterceptor
from token_inspector.proxy.streaming_forwarder import StreamingForwarder
from token_inspector.storage.inspection_store import InspectionStore
from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.cost_estimator import CostEstimator
from token_inspector.tokenizer.model_registry import ModelRegistry


class ReverseProxyServer:
    """ASGI HTTP/SSE reverse proxy intercepting and metering LLM API completions."""

    def __init__(
        self,
        upstream_url: str = "https://api.openai.com",
        store: Optional[InspectionStore] = None,
        broadcaster: Optional[Any] = None,
        client: Optional[httpx.AsyncClient] = None,
        interceptor: Optional[RequestInterceptor] = None,
        forwarder: Optional[StreamingForwarder] = None,
        disconnect_handler: Optional[DisconnectHandler] = None,
        registry: Optional[ModelRegistry] = None,
        cost_estimator: Optional[CostEstimator] = None,
    ) -> None:
        self.upstream_url = upstream_url.rstrip("/")
        self.store = store or InspectionStore()
        self.broadcaster = broadcaster
        self.client = client
        self.registry = registry or ModelRegistry()
        self.cost_estimator = cost_estimator or CostEstimator()
        self.interceptor = interceptor or RequestInterceptor(
            model_registry=self.registry, cost_estimator=self.cost_estimator
        )
        self.forwarder = forwarder or StreamingForwarder(
            cost_estimator=self.cost_estimator, model_registry=self.registry
        )
        self.disconnect_handler = disconnect_handler or DisconnectHandler(
            model_registry=self.registry, cost_estimator=self.cost_estimator
        )

        self.app = FastAPI(title="Token Inspector Reverse Proxy")
        self._setup_routes()

    def _setup_routes(self) -> None:
        @self.app.post("/v1/chat/completions")
        async def chat_completions(request: Request) -> Response:
            body_bytes = await request.body()
            payload: Dict[str, Any] = {}
            if body_bytes:
                try:
                    payload = json.loads(body_bytes.decode("utf-8"))
                except Exception:
                    pass

            # Pre-flight interception
            intercepted = self.interceptor.intercept_request(payload)

            # Broadcast pre-flight capture event
            if self.broadcaster and hasattr(self.broadcaster, "broadcast"):
                event = InspectorSSEEvent(
                    event_type="request_captured",
                    request_id=intercepted.request_id,
                    payload=intercepted.model_dump(mode="json"),
                    timestamp=datetime.now(timezone.utc).isoformat(),
                )
                try:
                    await self.broadcaster.broadcast(event)
                except Exception:
                    pass

            # Prepare upstream headers
            req_headers = dict(request.headers)
            req_headers.pop("host", None)
            req_headers.pop("content-length", None)

            upstream_target = f"{self.upstream_url}/v1/chat/completions"

            # Create or use client
            owns_client = False
            http_client = self.client
            if http_client is None:
                http_client = httpx.AsyncClient(timeout=120.0)
                owns_client = True

            start_time = time.perf_counter()

            if intercepted.is_streaming:
                # Streaming mode
                async def sse_generator():
                    try:
                        upstream_req = http_client.build_request(
                            "POST", upstream_target, content=body_bytes, headers=req_headers
                        )
                        upstream_resp = await http_client.send(upstream_req, stream=True)
                        upstream_stream = upstream_resp.aiter_bytes()

                        async for chunk in self.forwarder.stream_response(
                            upstream_stream=upstream_stream,
                            intercepted=intercepted,
                            store=self.store,
                            broadcaster=self.broadcaster,
                        ):
                            yield chunk
                    finally:
                        if owns_client:
                            await http_client.aclose()

                resp_headers = dict(intercepted.injected_headers)
                return StreamingResponse(
                    sse_generator(),
                    media_type="text/event-stream",
                    headers=resp_headers,
                )

            # Non-streaming mode
            try:
                upstream_resp = await http_client.post(
                    upstream_target, content=body_bytes, headers=req_headers
                )
                duration_ms = (time.perf_counter() - start_time) * 1000.0

                resp_data = {}
                completion_tokens = 0
                detail_tokens = []
                try:
                    resp_data = upstream_resp.json()
                    choices = resp_data.get("choices", [])
                    if choices:
                        content = choices[0].get("message", {}).get("content", "")
                        encoding_name = self.registry.get_encoding_name(intercepted.model)
                        encoder = BPEEncoder(encoding_name=encoding_name)
                        detail_tokens = encoder.encode_to_items(content)
                        completion_tokens = len(detail_tokens)
                except Exception:
                    pass

                total_tokens = intercepted.prompt_tokens + completion_tokens
                cost = self.cost_estimator.calculate_cost(
                    prompt_tokens=intercepted.prompt_tokens,
                    completion_tokens=completion_tokens,
                    model=intercepted.model,
                )
                ceiling = intercepted.context_ceiling
                saturation = (
                    round((total_tokens / ceiling) * 100.0, 4) if ceiling > 0 else 0.0
                )

                safe_req_headers = dict(request.headers)
                if "authorization" in safe_req_headers:
                    safe_req_headers["authorization"] = "Bearer [REDACTED]"

                record = InspectionRecord(
                    id=intercepted.request_id,
                    timestamp=datetime.now(timezone.utc),
                    method="POST",
                    path="/v1/chat/completions",
                    model=intercepted.model,
                    status_code=upstream_resp.status_code,
                    duration_ms=round(duration_ms, 2),
                    is_streaming=False,
                    prompt_tokens=intercepted.prompt_tokens,
                    completion_tokens=completion_tokens,
                    total_tokens=total_tokens,
                    context_ceiling=ceiling,
                    saturation_pct=saturation,
                    estimated_cost_usd=cost,
                    messages_breakdown=intercepted.messages_breakdown,
                    completion_tokens_detail=detail_tokens,
                    raw_request_headers=safe_req_headers,
                    raw_response_headers=dict(upstream_resp.headers),
                )
                self.store.add_record(record)

                combined_headers = dict(upstream_resp.headers)
                combined_headers.update(intercepted.injected_headers)
                combined_headers.pop("content-length", None)
                combined_headers.pop("content-encoding", None)

                return Response(
                    content=upstream_resp.content,
                    status_code=upstream_resp.status_code,
                    headers=combined_headers,
                    media_type=upstream_resp.headers.get("content-type", "application/json"),
                )
            finally:
                if owns_client:
                    await http_client.aclose()

    def get_app(self) -> FastAPI:
        return self.app
