import pytest

from token_inspector.budget.context_budget_manager import ContextBudgetManager
from token_inspector.models.budget_schemas import (
    BudgetExceededError,
    ContextBudgetRequest,
    ContextMessage,
    PriorityTier,
    TruncationResult,
)


def test_context_budget_manager_monolithic_overflow_raises_error() -> None:
    # Arrange: Monolithic user query with 5,000 tokens, ceiling 2,048
    large_query = "word " * 5000
    request = ContextBudgetRequest(
        messages=[
            ContextMessage(role="system", content="System instruction", priority=PriorityTier.SYSTEM_RULES),
            ContextMessage(role="user", content=large_query, priority=PriorityTier.USER_QUERY),
        ],
        max_tokens=2048,
        model="gpt-4o",
        allow_user_truncation=False,
    )
    manager = ContextBudgetManager()

    # Act & Assert
    with pytest.raises(BudgetExceededError) as exc_info:
        manager.manage_budget(request)

    assert exc_info.value.current_tokens > 2048
    assert exc_info.value.max_tokens == 2048


def test_context_budget_manager_monolithic_overflow_head_tail_truncation() -> None:
    # Arrange: Monolithic user query with allow_user_truncation=True
    large_query = "FIRST_PREFIX " + ("content " * 4000) + " LAST_SUFFIX"
    request = ContextBudgetRequest(
        messages=[
            ContextMessage(role="system", content="System instruction", priority=PriorityTier.SYSTEM_RULES),
            ContextMessage(role="user", content=large_query, priority=PriorityTier.USER_QUERY),
        ],
        max_tokens=1000,
        model="gpt-4o",
        allow_user_truncation=True,
    )
    manager = ContextBudgetManager()

    # Act
    result = manager.manage_budget(request)

    # Assert
    assert isinstance(result, TruncationResult)
    assert result.is_budget_satisfied is True
    assert result.diff.tokens_saved > 0

    user_msg_content = str(result.messages[1]["content"])
    assert "FIRST_PREFIX" in user_msg_content
    assert "LAST_SUFFIX" in user_msg_content
    assert "truncated" in user_msg_content.lower()


def test_context_budget_manager_orchestrates_history_pruning_and_markdown_repair() -> None:
    # Arrange: system + history turns + markdown unclosed
    messages = [
        ContextMessage(role="system", content="System prompt", priority=PriorityTier.SYSTEM_RULES),
        ContextMessage(role="user", content="Turn 1 " * 200, priority=PriorityTier.CHAT_HISTORY),
        ContextMessage(role="assistant", content="Reply 1 " * 200, priority=PriorityTier.CHAT_HISTORY),
        ContextMessage(
            role="user",
            content="```python\ndef test():\n    return 42",
            priority=PriorityTier.USER_QUERY,
        ),
    ]
    request = ContextBudgetRequest(
        messages=messages,
        max_tokens=600,
        model="gpt-4o",
        auto_close_markdown=True,
    )
    manager = ContextBudgetManager()

    # Act
    result = manager.manage_budget(request)

    # Assert
    assert result.is_budget_satisfied is True
    assert len(result.diff.pruned_message_indices) > 0
    # Markdown was repaired
    assert result.markdown_repaired is True
