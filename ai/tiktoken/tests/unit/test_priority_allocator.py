from typing import List
import pytest

from token_inspector.models.budget_schemas import ContextMessage, PriorityTier
from token_inspector.budget.priority_allocator import PriorityAllocator, TierAllocation


def test_priority_allocator_hierarchical_budget_distribution() -> None:
    # Arrange: P1 (300 tk), P2 (400 tk), P3 (1500 tk), P4 (3000 tk), max_tokens = 2000
    # We can pass messages or token counts
    messages = [
        ContextMessage(role="system", content="A" * 300, priority=PriorityTier.SYSTEM_RULES),
        ContextMessage(role="user", content="B" * 400, priority=PriorityTier.USER_QUERY),
        ContextMessage(role="system", content="C" * 1500, priority=PriorityTier.FEW_SHOT),
        ContextMessage(role="user", content="D" * 3000, priority=PriorityTier.CHAT_HISTORY),
    ]
    # For testing, we mock or specify token counts per message: [300, 400, 1500, 3000]
    allocator = PriorityAllocator()
    message_tokens = [300, 400, 1500, 3000]

    # Act
    allocation = allocator.allocate(messages=messages, max_tokens=2000, message_tokens=message_tokens)

    # Assert
    assert allocation.tier_quotas[PriorityTier.SYSTEM_RULES] == 300
    assert allocation.tier_quotas[PriorityTier.USER_QUERY] == 400
    assert allocation.tier_quotas[PriorityTier.FEW_SHOT] == 1300  # Remaining (2000 - 700)
    assert allocation.tier_quotas[PriorityTier.CHAT_HISTORY] == 0  # Nothing left for P4
    assert allocation.total_allocated == 2000
