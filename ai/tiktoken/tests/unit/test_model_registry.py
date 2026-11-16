import pytest
from token_inspector.tokenizer.model_registry import ModelRegistry


def test_model_registry_known_models() -> None:
    # Arrange
    registry = ModelRegistry()

    # Act
    gpt4o = registry.get("gpt-4o")
    gpt4_turbo = registry.get("gpt-4-turbo")
    gpt35 = registry.get("gpt-3.5-turbo")
    embed = registry.get("text-embedding-3-small")

    # Assert
    assert gpt4o.encoding_name == "o200k_base"
    assert gpt4o.context_ceiling == 128000
    assert gpt4o.is_fallback is False

    assert gpt4_turbo.encoding_name == "cl100k_base"
    assert gpt4_turbo.context_ceiling == 128000

    assert gpt35.encoding_name == "cl100k_base"
    assert gpt35.context_ceiling == 16385

    assert embed.encoding_name == "cl100k_base"
    assert embed.context_ceiling == 8191


def test_model_registry_unknown_model_fallback() -> None:
    # Arrange
    registry = ModelRegistry()

    # Act
    unknown = registry.get("my-custom-finetuned-llama")

    # Assert
    assert unknown.is_fallback is True
    assert unknown.encoding_name == "cl100k_base"
    assert unknown.context_ceiling == 128000


def test_model_registry_custom_registration() -> None:
    # Arrange
    registry = ModelRegistry()

    # Act
    registry.register(model_name="custom-model-v1", encoding_name="o200k_base", context_ceiling=64000)
    meta = registry.get("custom-model-v1")

    # Assert
    assert meta.model_name == "custom-model-v1"
    assert meta.encoding_name == "o200k_base"
    assert meta.context_ceiling == 64000
    assert meta.is_fallback is False
