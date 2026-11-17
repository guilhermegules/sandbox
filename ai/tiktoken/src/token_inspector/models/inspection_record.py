from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

from token_inspector.models.token_item import TokenItem


class RoleTokenBreakdown(BaseModel):
    role: str = Field(..., description="system | user | assistant | tool")
    token_count: int = Field(..., ge=0, description="Total tokens in message")
    tokens: List[TokenItem] = Field(default_factory=list, description="Detailed token items")


class InspectionRecord(BaseModel):
    id: str = Field(..., description="Unique request identifier (e.g. req_89f2a)")
    timestamp: datetime = Field(..., description="ISO-8601 UTC timestamp of request")
    method: str = Field("POST", description="HTTP request method")
    path: str = Field("/v1/chat/completions", description="Intercepted request endpoint")
    model: str = Field(..., description="Requested model identifier (e.g. gpt-4o)")
    status_code: int = Field(200, description="HTTP response status code from upstream")
    duration_ms: float = Field(..., ge=0.0, description="End-to-end request latency in milliseconds")
    ttfb_ms: Optional[float] = Field(None, ge=0.0, description="Time to first byte in streaming mode")
    is_streaming: bool = Field(False, description="True if stream: true was requested")

    prompt_tokens: int = Field(..., ge=0, description="Total prompt tokens calculated via BPE")
    completion_tokens: int = Field(0, ge=0, description="Total completion tokens generated")
    total_tokens: int = Field(..., ge=0, description="prompt_tokens + completion_tokens")
    context_ceiling: int = Field(..., gt=0, description="Total model context window limit")
    saturation_pct: float = Field(..., ge=0.0, description="Percentage of context window consumed (0-100+)")

    estimated_cost_usd: float = Field(..., ge=0.0, description="Estimated cost based on model pricing")
    messages_breakdown: List[RoleTokenBreakdown] = Field(default_factory=list)
    completion_tokens_detail: List[TokenItem] = Field(default_factory=list)
    raw_request_headers: Dict[str, str] = Field(default_factory=dict)
    raw_response_headers: Dict[str, str] = Field(default_factory=dict)
