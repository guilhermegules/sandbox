import pytest
from token_inspector.tokenizer.multimodal_estimator import MultimodalEstimator


def test_multimodal_low_detail() -> None:
    # Arrange
    estimator = MultimodalEstimator()

    # Act
    tokens = estimator.estimate_image_tokens(width=1024, height=1024, detail="low")

    # Assert
    assert tokens == 85


def test_multimodal_high_detail_1024x1024() -> None:
    # Arrange
    estimator = MultimodalEstimator()

    # Act
    tokens = estimator.estimate_image_tokens(width=1024, height=1024, detail="high")

    # Assert
    # 4 tiles * 170 + 85 = 765
    assert tokens == 765


def test_multimodal_high_detail_2048x1024() -> None:
    # Arrange
    estimator = MultimodalEstimator()

    # Act
    tokens = estimator.estimate_image_tokens(width=2048, height=1024, detail="high")

    # Assert
    # 8 tiles * 170 + 85 = 1445
    assert tokens == 1445


def test_multimodal_dict_payload_parsing() -> None:
    # Arrange
    estimator = MultimodalEstimator()
    payload = {
        "type": "image_url",
        "image_url": {
            "url": "https://example.com/photo.png",
            "detail": "high",
        },
        "width": 1024,
        "height": 1024,
    }

    # Act
    tokens = estimator.estimate_payload_tokens(payload)

    # Assert
    assert tokens == 765


def test_multimodal_url_only_fallback() -> None:
    # Arrange
    estimator = MultimodalEstimator()
    payload = {
        "type": "image_url",
        "image_url": {"url": "https://example.com/photo.png"},
    }

    # Act
    tokens = estimator.estimate_payload_tokens(payload)

    # Assert
    # High detail default fallback without dimensions = 765
    assert tokens == 765
