import pytest
from token_inspector.tokenizer.bpe_encoder import BPEEncoder


def test_bpe_encoder_cl100k_encode_known_strings() -> None:
    # Arrange
    encoder = BPEEncoder(encoding_name="cl100k_base")
    sample_text = "Hello world"

    # Act
    token_ids = encoder.encode(sample_text)
    decoded_text = encoder.decode(token_ids)
    token_count = encoder.count_tokens(sample_text)

    # Assert
    assert token_ids == [9906, 1917]
    assert decoded_text == sample_text
    assert token_count == 2


def test_bpe_encoder_o200k_encode_items() -> None:
    # Arrange
    encoder = BPEEncoder(encoding_name="o200k_base")
    sample_text = "Hello world 👋"

    # Act
    items = encoder.encode_to_items(sample_text)

    # Assert
    assert len(items) >= 2
    assert items[0].index == 0
    assert items[0].text == "Hello"
    assert items[0].byte_length == 5
    assert "0x" in items[0].raw_bytes
    assert items[0].is_whitespace is False

    # Check that decoding all item token IDs reconstitutes original text
    reconstructed = encoder.decode([item.token_id for item in items])
    assert reconstructed == sample_text


def test_bpe_encoder_whitespace_and_subwords() -> None:
    # Arrange
    encoder = BPEEncoder(encoding_name="cl100k_base")
    text = "   multiple spaces and antidisestablishmentarianism"

    # Act
    items = encoder.encode_to_items(text)

    # Assert
    assert any(item.is_whitespace for item in items)
    # antidisestablishmentarianism is broken into subwords
    subword_tokens = [item for item in items if item.subword_info.is_subword_continuation]
    assert len(subword_tokens) > 0
