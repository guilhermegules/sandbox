from token_inspector.tokenizer.chat_formatter import ChatFormatter
from token_inspector.tokenizer.bpe_encoder import BPEEncoder


def test_chat_formatter_overhead_matches_cookbook_parity() -> None:
    # Arrange
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"},
        {"role": "assistant", "content": "Hi there! How can I help you today?"},
        {"role": "user", "content": "What is 2 + 2?", "name": "alice"},
    ]
    formatter = ChatFormatter()
    encoder = BPEEncoder(encoding_name="o200k_base")

    # Manual cookbook calculation:
    # Each message: 3 tokens (<|im_start|>{role}\n ... <|im_end|>\n)
    # Plus content tokens and role tokens
    # Plus 1 token for name when present
    # Plus 3 tokens for assistant reply primer at the end
    expected_content_tokens = sum(
        encoder.count_tokens(m["content"]) + encoder.count_tokens(m["role"])
        for m in messages
    )
    expected_overhead = (len(messages) * 3) + 1 + 3  # 4 msgs * 3 + 1 name + 3 assistant primer
    expected_total = expected_content_tokens + expected_overhead

    # Act
    total_tokens = formatter.count_chat_tokens(messages, model="gpt-4o")

    # Assert
    assert total_tokens == expected_total


def test_chat_formatter_breakdown() -> None:
    # Arrange
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"},
    ]
    formatter = ChatFormatter()

    # Act
    breakdowns = formatter.breakdown_messages(messages, model="gpt-4o")

    # Assert
    assert len(breakdowns) == 2
    assert breakdowns[0].role == "system"
    assert breakdowns[0].token_count > 0
    assert len(breakdowns[0].tokens) > 0
    assert breakdowns[1].role == "user"
