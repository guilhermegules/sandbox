from typing import Any, Dict, Literal
from pydantic import BaseModel, Field


class InspectorSSEEvent(BaseModel):
    event_type: Literal["request_captured", "stream_chunk", "stream_completed", "stream_aborted"]
    request_id: str
    payload: Dict[str, Any] = Field(default_factory=dict)
    timestamp: str
