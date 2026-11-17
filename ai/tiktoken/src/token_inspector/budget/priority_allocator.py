from typing import Dict, List, Optional
from pydantic import BaseModel, Field

from token_inspector.models.budget_schemas import ContextMessage, PriorityTier
from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.model_registry import ModelRegistry


class TierAllocation(BaseModel):
    tier_quotas: Dict[PriorityTier, int] = Field(default_factory=dict)
    total_allocated: int = 0
    remaining_tokens: int = 0


class PriorityAllocator:
    """Allocates available context token budget across message priority tiers (P1 -> P2 -> P3 -> P4)."""

    def __init__(self, registry: Optional[ModelRegistry] = None) -> None:
        self.registry = registry or ModelRegistry()

    def allocate(
        self,
        messages: List[ContextMessage],
        max_tokens: int,
        message_tokens: Optional[List[int]] = None,
        model: str = "gpt-4o",
    ) -> TierAllocation:
        if message_tokens is None:
            encoding_name = self.registry.get_encoding_name(model)
            encoder = BPEEncoder(encoding_name=encoding_name)
            message_tokens = [
                encoder.count_tokens(str(m.content)) for m in messages
            ]

        # Calculate requested tokens per tier
        tier_demands: Dict[PriorityTier, int] = {
            PriorityTier.SYSTEM_RULES: 0,
            PriorityTier.USER_QUERY: 0,
            PriorityTier.FEW_SHOT: 0,
            PriorityTier.CHAT_HISTORY: 0,
        }

        for msg, tokens in zip(messages, message_tokens):
            tier_demands[msg.priority] += tokens

        tier_quotas: Dict[PriorityTier, int] = {
            PriorityTier.SYSTEM_RULES: 0,
            PriorityTier.USER_QUERY: 0,
            PriorityTier.FEW_SHOT: 0,
            PriorityTier.CHAT_HISTORY: 0,
        }

        remaining = max_tokens
        # Allocate strictly in order P1 -> P2 -> P3 -> P4
        for tier in [
            PriorityTier.SYSTEM_RULES,
            PriorityTier.USER_QUERY,
            PriorityTier.FEW_SHOT,
            PriorityTier.CHAT_HISTORY,
        ]:
            demand = tier_demands[tier]
            granted = min(demand, max(0, remaining))
            tier_quotas[tier] = granted
            remaining -= granted

        total_allocated = sum(tier_quotas.values())
        return TierAllocation(
            tier_quotas=tier_quotas,
            total_allocated=total_allocated,
            remaining_tokens=max(0, remaining),
        )
