from typing import Any, Dict, List, Optional
import uuid
from pydantic import BaseModel, Field

from token_inspector.models.inspection_record import RoleTokenBreakdown
from token_inspector.tokenizer.chat_formatter import ChatFormatter
from token_inspector.tokenizer.cost_estimator import CostEstimator
from token_inspector.tokenizer.model_registry import ModelRegistry


class InterceptedRequest(BaseModel):
    request_id: str
    model: str
    prompt_tokens: int
    estimated_cost_usd: float
    context_ceiling: int
    saturation_pct: float
    is_streaming: bool
    messages_breakdown: List[RoleTokenBreakdown] = Field(default_factory=list)
    injected_headers: Dict[str, str] = Field(default_factory=dict)


class RequestInterceptor:
    """Pre-flight request interceptor calculating tokens, saturation, and debug headers."""

    def __init__(
        self,
        chat_formatter: Optional[ChatFormatter] = None,
        model_registry: Optional[ModelRegistry] = None,
        cost_estimator: Optional[CostEstimator] = None,
    ) -> None:
        self.registry = model_registry or ModelRegistry()
        self.formatter = chat_formatter or ChatFormatter(registry=self.registry)
        self.cost_estimator = cost_estimator or CostEstimator()

    def intercept_request(
        self,
        payload: Dict[str, Any],
        request_id: Optional[str] = None,
    ) -> InterceptedRequest:
        req_id = request_id or f"req_{uuid.uuid4().hex[:12]}"
        model = str(payload.get("model", "gpt-4o"))
        messages = payload.get("messages", [])
        is_streaming = bool(payload.get("stream", False))

        prompt_tokens = self.formatter.count_chat_tokens(messages, model=model)
        breakdowns = self.formatter.breakdown_messages(messages, model=model)
        ceiling = self.registry.get_context_ceiling(model)
        saturation = round((prompt_tokens / ceiling) * 100.0, 4) if ceiling > 0 else 0.0
        cost = self.cost_estimator.calculate_cost(
            prompt_tokens=prompt_tokens, completion_tokens=0, model=model
        )

        headers = {
            "X-Token-Inspector-Request-ID": req_id,
            "X-Token-Inspector-Prompt-Tokens": str(prompt_tokens),
            "X-Token-Inspector-Cost-USD": f"{cost:.6f}",
            "X-Token-Inspector-Saturation-Pct": f"{saturation:.2f}",
        }

        return InterceptedRequest(
            request_id=req_id,
            model=model,
            prompt_tokens=prompt_tokens,
            estimated_cost_usd=cost,
            context_ceiling=ceiling,
            saturation_pct=saturation,
            is_streaming=is_streaming,
            messages_breakdown=breakdowns,
            injected_headers=headers,
        )
