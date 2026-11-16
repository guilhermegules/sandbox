from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import Any, AsyncIterator, Callable, Optional
import asyncio

from token_inspector.models.event_schemas import InspectorSSEEvent
from token_inspector.models.inspection_record import InspectionRecord
from token_inspector.proxy.request_interceptor import InterceptedRequest
from token_inspector.storage.inspection_store import InspectionStore
from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.cost_estimator import CostEstimator
from token_inspector.tokenizer.model_registry import ModelRegistry


class DisconnectHandler:
    """Handles client socket disconnects, aborts upstream connections, and logs partial telemetry."""

    def __init__(
        self,
        model_registry: Optional[ModelRegistry] = None,
        cost_estimator: Optional[CostEstimator] = None,
    ) -> None:
        self.registry = model_registry or ModelRegistry()
        self.cost_estimator = cost_estimator or CostEstimator()

    @asynccontextmanager
    async def guard(
        self,
        request_id: str,
        upstream_response: Optional[Any],
        intercepted: InterceptedRequest,
        partial_text_fn: Callable[[], str],
        store: Optional[InspectionStore] = None,
        broadcaster: Optional[Any] = None,
    ) -> AsyncIterator[None]:
        try:
            yield
        except asyncio.CancelledError:
            # Client disconnected mid-flight: immediately close upstream
            if upstream_response is not None:
                if hasattr(upstream_response, "aclose"):
                    try:
                        await upstream_response.aclose()
                    except Exception:
                        pass
                elif hasattr(upstream_response, "close"):
                    try:
                        upstream_response.close()
                    except Exception:
                        pass

            partial_text = partial_text_fn()
            encoding_name = self.registry.get_encoding_name(intercepted.model)
            encoder = BPEEncoder(encoding_name=encoding_name)
            partial_tokens_detail = encoder.encode_to_items(partial_text)
            partial_count = len(partial_tokens_detail)
            total_tokens = intercepted.prompt_tokens + partial_count

            cost = self.cost_estimator.calculate_cost(
                prompt_tokens=intercepted.prompt_tokens,
                completion_tokens=partial_count,
                model=intercepted.model,
            )

            record = InspectionRecord(
                id=request_id,
                timestamp=datetime.now(timezone.utc),
                method="POST",
                path="/v1/chat/completions",
                model=intercepted.model,
                status_code=499,  # Client Closed Request
                duration_ms=0.0,
                is_streaming=True,
                prompt_tokens=intercepted.prompt_tokens,
                completion_tokens=partial_count,
                total_tokens=total_tokens,
                context_ceiling=intercepted.context_ceiling,
                saturation_pct=intercepted.saturation_pct,
                estimated_cost_usd=cost,
                messages_breakdown=intercepted.messages_breakdown,
                completion_tokens_detail=partial_tokens_detail,
                raw_request_headers=intercepted.injected_headers,
                raw_response_headers={"status": "aborted"},
            )

            if store:
                store.add_record(record)

            if broadcaster and hasattr(broadcaster, "broadcast"):
                event = InspectorSSEEvent(
                    event_type="stream_aborted",
                    request_id=request_id,
                    payload={
                        "partial_tokens": partial_count,
                        "total_tokens": total_tokens,
                        "cost_usd": cost,
                        "partial_text": partial_text,
                    },
                    timestamp=datetime.now(timezone.utc).isoformat(),
                )
                try:
                    await broadcaster.broadcast(event)
                except Exception:
                    pass

            raise
