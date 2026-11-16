from enum import IntEnum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class PriorityTier(IntEnum):
    SYSTEM_RULES = 1      # Never prune
    USER_QUERY = 2        # Never prune unless monolithic overflow policy triggers
    FEW_SHOT = 3          # Prune if history is exhausted
    CHAT_HISTORY = 4      # Prune oldest first (sliding window)


class ContextMessage(BaseModel):
    role: str
    content: Any          # str or List[Dict[str, Any]] for multimodal
    priority: PriorityTier = PriorityTier.CHAT_HISTORY
    name: Optional[str] = None


class ContextBudgetRequest(BaseModel):
    messages: List[ContextMessage]
    max_tokens: int = Field(..., gt=0, description="Target token budget ceiling")
    model: str = Field("gpt-4o", description="Model name for tokenizer encoding")
    allow_user_truncation: bool = Field(False, description="Allow P2 truncation if query alone exceeds ceiling")
    ensure_json_syntax: bool = Field(True, description="Enforce valid JSON syntax on pruned data payloads")
    auto_close_markdown: bool = Field(True, description="Close open markdown fences on truncated text")


class TruncationDiff(BaseModel):
    original_tokens: int
    truncated_tokens: int
    tokens_saved: int
    pruned_message_indices: List[int]
    partially_pruned_details: Dict[str, Any] = Field(default_factory=dict)


class TruncationResult(BaseModel):
    messages: List[Dict[str, Any]]
    diff: TruncationDiff
    is_budget_satisfied: bool
    json_ast_validated: bool
    markdown_repaired: bool


class BudgetExceededError(Exception):
    """Raised when context ceiling is exceeded and allow_user_truncation is False."""

    def __init__(self, message: str, current_tokens: int, max_tokens: int) -> None:
        super().__init__(message)
        self.current_tokens = current_tokens
        self.max_tokens = max_tokens
