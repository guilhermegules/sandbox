from typing import Any, Dict, List, Optional
import json

from token_inspector.models.inspection_record import RoleTokenBreakdown
from token_inspector.models.token_item import TokenItem
from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.model_registry import ModelRegistry


class ChatFormatter:
    """Calculates OpenAI ChatML token counts and overhead with exact cookbook parity."""

    def __init__(self, registry: Optional[ModelRegistry] = None) -> None:
        self.registry = registry or ModelRegistry()

    def _get_encoder(self, model: str) -> BPEEncoder:
        encoding_name = self.registry.get_encoding_name(model)
        return BPEEncoder(encoding_name=encoding_name)

    def _extract_content_text(self, content: Any) -> str:
        if isinstance(content, str):
            return content
        if isinstance(content, (dict, list)):
            return json.dumps(content)
        return str(content) if content is not None else ""

    def count_chat_tokens(self, messages: List[Dict[str, Any]], model: str = "gpt-4o") -> int:
        """Count prompt tokens for chat messages including ChatML overhead."""
        encoder = self._get_encoder(model)
        num_tokens = 0

        # Official OpenAI recipe:
        # Every message follows <|im_start|>{role/name}\n{content}<|im_end|>\n
        # That's 3 tokens per message + tokens for role + tokens for content
        # + 1 token if name is present
        for message in messages:
            num_tokens += 3  # Formatting overhead per message
            role = str(message.get("role", ""))
            num_tokens += encoder.count_tokens(role)

            content = self._extract_content_text(message.get("content", ""))
            num_tokens += encoder.count_tokens(content)

            if "name" in message:
                num_tokens += 1
                name = str(message["name"])
                # Note: name replaces role in some templates or adds 1 formatting token

        num_tokens += 3  # Every reply is primed with <|im_start|>assistant\n
        return num_tokens

    def breakdown_messages(
        self, messages: List[Dict[str, Any]], model: str = "gpt-4o"
    ) -> List[RoleTokenBreakdown]:
        """Provide detailed token breakdown per message."""
        encoder = self._get_encoder(model)
        breakdowns: List[RoleTokenBreakdown] = []

        for message in messages:
            role = str(message.get("role", "user"))
            content = self._extract_content_text(message.get("content", ""))
            items = encoder.encode_to_items(content)
            # Add message formatting overhead to count
            token_count = len(items) + 3 + encoder.count_tokens(role) + (1 if "name" in message else 0)
            breakdowns.append(
                RoleTokenBreakdown(
                    role=role,
                    token_count=token_count,
                    tokens=items,
                )
            )

        return breakdowns
