from typing import List, Optional
import tiktoken

from token_inspector.models.token_item import SubwordInfo, TokenItem


class BPEEncoder:
    """Wrapper around tiktoken BPE tokenizer providing fine-grained token inspections."""

    def __init__(self, encoding_name: str = "cl100k_base") -> None:
        self.encoding_name = encoding_name
        self._encoding = tiktoken.get_encoding(encoding_name)

    def encode(self, text: str, allowed_special: str | set[str] = "all") -> List[int]:
        """Encode text to token IDs."""
        return self._encoding.encode(text, allowed_special=allowed_special)

    def decode(self, token_ids: List[int]) -> str:
        """Decode token IDs back to string."""
        return self._encoding.decode(token_ids)

    def count_tokens(self, text: str, allowed_special: str | set[str] = "all") -> int:
        """Count the number of tokens in text."""
        return len(self.encode(text, allowed_special=allowed_special))

    def encode_to_items(self, text: str) -> List[TokenItem]:
        """Encode text into rich TokenItem objects with byte breakdowns and subword tracking."""
        token_ids = self.encode(text)
        items: List[TokenItem] = []

        word_index = 0
        in_word = False

        for idx, token_id in enumerate(token_ids):
            token_bytes = self._encoding.decode_single_token_bytes(token_id)
            token_text = token_bytes.decode("utf-8", errors="replace")
            raw_bytes = " ".join(f"0x{b:02x}" for b in token_bytes)
            byte_len = len(token_bytes)
            is_whitespace = len(token_text) > 0 and token_text.strip() == ""

            # Subword logic
            is_continuation = False
            if is_whitespace:
                in_word = False
            else:
                has_leading_space = token_text.startswith(" ") or token_text.startswith("\t") or token_text.startswith("\n")
                if has_leading_space:
                    word_index += 1
                    in_word = True
                    is_continuation = False
                elif in_word:
                    # Token continues a word started by prior token without space
                    is_continuation = True
                else:
                    word_index += 1
                    in_word = True
                    is_continuation = False

            subword_info = SubwordInfo(
                is_subword_continuation=is_continuation,
                word_boundary_index=word_index,
            )

            items.append(
                TokenItem(
                    index=idx,
                    token_id=token_id,
                    text=token_text,
                    raw_bytes=raw_bytes,
                    byte_length=byte_len,
                    is_whitespace=is_whitespace,
                    subword_info=subword_info,
                )
            )

        return items
