from typing import Any, Dict, List, Optional, Tuple
import copy

from token_inspector.tokenizer.chat_formatter import ChatFormatter
from token_inspector.tokenizer.model_registry import ModelRegistry


class SlidingWindowPruner:
    """FIFO conversation history sliding window pruner that drops oldest turns in pairs."""

    def __init__(
        self,
        formatter: Optional[ChatFormatter] = None,
        registry: Optional[ModelRegistry] = None,
    ) -> None:
        self.registry = registry or ModelRegistry()
        self.formatter = formatter or ChatFormatter(registry=self.registry)

    def prune(
        self,
        messages: List[Dict[str, Any]],
        max_tokens: int,
        model: str = "gpt-4o",
        preserve_system: bool = True,
        preserve_pairs: bool = True,
    ) -> Tuple[List[Dict[str, Any]], List[int]]:
        """Prune oldest turns from conversation history to fit within max_tokens ceiling."""
        if not messages:
            return [], []

        current_messages = copy.deepcopy(messages)
        original_indices = list(range(len(messages)))
        dropped_indices: List[int] = []

        # If already within budget
        if self.formatter.count_chat_tokens(current_messages, model=model) <= max_tokens:
            return current_messages, dropped_indices

        # Check if first message is a system message
        has_system = preserve_system and current_messages[0].get("role") == "system"
        start_offset = 1 if has_system else 0

        while (
            len(current_messages) > start_offset
            and self.formatter.count_chat_tokens(current_messages, model=model) > max_tokens
        ):
            history_len = len(current_messages) - start_offset

            if (
                preserve_pairs
                and history_len >= 2
                and current_messages[start_offset].get("role") == "user"
                and current_messages[start_offset + 1].get("role") == "assistant"
            ):
                # Drop pair
                dropped_indices.append(original_indices[start_offset])
                dropped_indices.append(original_indices[start_offset + 1])
                del current_messages[start_offset : start_offset + 2]
                del original_indices[start_offset : start_offset + 2]
            else:
                # Drop single oldest message
                dropped_indices.append(original_indices[start_offset])
                del current_messages[start_offset]
                del original_indices[start_offset]

        return current_messages, dropped_indices
