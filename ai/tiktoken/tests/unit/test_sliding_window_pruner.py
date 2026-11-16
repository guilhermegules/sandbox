from typing import Any, Dict, List
import pytest

from token_inspector.budget.sliding_window_pruner import SlidingWindowPruner
from token_inspector.tokenizer.chat_formatter import ChatFormatter


def test_sliding_window_pruner_drops_oldest_pairs_first() -> None:
    # Arrange: 1 system message + 10 turns (5 user-assistant pairs), totaling > 2000 tokens
    messages: List[Dict[str, Any]] = [
        {"role": "system", "content": "You are a helpful assistant."}
    ]
    for i in range(5):
        messages.append({"role": "user", "content": f"User question {i}: " + ("content " * 200)})
        messages.append({"role": "assistant", "content": f"Assistant reply {i}: " + ("answer " * 200)})

    formatter = ChatFormatter()
    initial_tokens = formatter.count_chat_tokens(messages, model="gpt-4o")
    assert initial_tokens > 1500

    pruner = SlidingWindowPruner()
    target_tokens = 800

    # Act
    pruned_messages, dropped_indices = pruner.prune(
        messages=messages,
        max_tokens=target_tokens,
        model="gpt-4o",
        preserve_pairs=True,
    )

    # Assert
    # System message preserved
    assert pruned_messages[0]["role"] == "system"

    # Newest turn (pair 4) is retained intact
    assert "User question 4" in pruned_messages[-2]["content"]
    assert "Assistant reply 4" in pruned_messages[-1]["content"]

    # Oldest turns were dropped
    assert 1 in dropped_indices
    assert 2 in dropped_indices

    # Token count is within budget
    final_tokens = formatter.count_chat_tokens(pruned_messages, model="gpt-4o")
    assert final_tokens <= target_tokens
