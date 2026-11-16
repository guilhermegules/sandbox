from datetime import datetime, timezone
from typing import Any, AsyncIterator, List, Optional
import json
import time

from token_inspector.models.inspection_record import InspectionRecord
from token_inspector.models.token_item import TokenItem
from token_inspector.proxy.request_interceptor import InterceptedRequest
from token_inspector.storage.inspection_store import InspectionStore
from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.cost_estimator import CostEstimator
from token_inspector.tokenizer.model_registry import ModelRegistry


class StreamingForwarder:
    """Pass-through streaming SSE forwarder with zero added latency and background token accumulation."""

    def __init__(
        self,
        cost_estimator: Optional[CostEstimator] = None,
        model_registry: Optional[ModelRegistry] = None,
    ) -> None:
        self.cost_estimator = cost_estimator or CostEstimator()
        self.registry = model_registry or ModelRegistry()

    async def stream_response(
        self,
        upstream_stream: AsyncIterator[bytes],
        intercepted: InterceptedRequest,
        store: Optional[InspectionStore] = None,
        broadcaster: Optional[Any] = None,
    ) -> AsyncIterator[bytes]:
        start_time = time.perf_counter()
        ttfb_ms: Optional[float] = None
        accumulated_text_pieces: List[str] = []

        try:
            async for chunk in upstream_stream:
                if ttfb_ms is None:
                    ttfb_ms = (time.perf_counter() - start_time) * 1000.0

                # Yield immediately to ensure zero latency
                yield chunk

                # Parse chunk for token accumulation
                try:
                    text_chunk = chunk.decode("utf-8", errors="ignore")
                    for line in text_chunk.splitlines():
                        line = line.strip()
                        if line.startswith("data: ") and not line.startswith("data: [DONE]"):
                            json_payload = line[6:]
                            data_obj = json.loads(json_payload)
                            choices = data_obj.get("choices", [])
                            if choices:
                                delta = choices[0].get("delta", {})
                                content = delta.get("content")
                                if content:
                                    accumulated_text_pieces.append(content)
                except Exception:
                    pass
        finally:
            duration_ms = (time.perf_counter() - start_time) * 1000.0
            full_completion_text = "".join(accumulated_text_pieces)

            encoding_name = self.registry.get_encoding_name(intercepted.model)
            encoder = BPEEncoder(encoding_name=encoding_name)
            detail_tokens = encoder.encode_to_items(full_completion_text)
            completion_tokens = len(detail_tokens)
            total_tokens = intercepted.prompt_tokens + completion_tokens

            total_cost = self.cost_estimator.calculate_cost(
                prompt_tokens=intercepted.prompt_tokens,
                completion_tokens=completion_tokens,
                model=intercepted.model,
            )

            ceiling = intercepted.context_ceiling
            saturation = round((total_tokens / ceiling) * 100.0, 4) if ceiling > 0 else 0.0

            record = InspectionRecord(
                id=intercepted.request_id,
                timestamp=datetime.now(timezone.utc),
                method="POST",
                path="/v1/chat/completions",
                model=intercepted.model,
                status_code=200,
                duration_ms=round(duration_ms, 2),
                ttfb_ms=round(ttfb_ms, 2) if ttfb_ms is not None else None,
                is_streaming=True,
                prompt_tokens=intercepted.prompt_tokens,
                completion_tokens=completion_tokens,
                total_tokens=total_tokens,
                context_ceiling=ceiling,
                saturation_pct=saturation,
                estimated_cost_usd=total_cost,
                messages_breakdown=intercepted.messages_breakdown,
                completion_tokens_detail=detail_tokens,
                raw_request_headers=intercepted.injected_headers,
                raw_response_headers={"content-type": "text/event-stream"},
            )

            if store:
                store.add_record(record)

            if broadcaster and hasattr(broadcaster, "broadcast"):
                from token_inspector.models.event_schemas import InspectorSSEEvent

                event = InspectorSSEEvent(
                    event_type="stream_completed",
                    request_id=intercepted.request_id,
                    payload=record.model_dump(mode="json"),
                    timestamp=datetime.now(timezone.utc).isoformat(),
                )
                if hasattr(broadcaster, "broadcast_sync"):
                    broadcaster.broadcast_sync(event)
                else:
                    await broadcaster.broadcast(event)
