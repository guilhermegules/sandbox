import math
import pytest

from token_inspector.sampling.perplexity_calculator import PerplexityCalculator


def test_perplexity_calculator_known_sequence() -> None:
    # Arrange: 5 tokens with logprobs [-0.1, -0.2, -0.15, -0.05, -0.1]
    logprobs = [-0.1, -0.2, -0.15, -0.05, -0.1]
    calculator = PerplexityCalculator()

    # Act
    ppl = calculator.calculate_perplexity(logprobs)
    avg_conf = calculator.calculate_average_confidence(logprobs)
    entropy = calculator.calculate_sequence_entropy(logprobs)

    # Assert
    # exp(- (-0.12)) = exp(0.12) ~= 1.127497
    expected_ppl = math.exp(0.12)
    assert ppl == pytest.approx(expected_ppl, rel=1e-3)
    assert ppl == pytest.approx(1.127, abs=1e-3)

    # Average confidence > 85%
    assert avg_conf > 85.0
    assert entropy == pytest.approx(0.12, rel=1e-3)


def test_perplexity_calculator_empty_sequence() -> None:
    # Arrange
    calculator = PerplexityCalculator()

    # Act & Assert
    assert calculator.calculate_perplexity([]) == 1.0
    assert calculator.calculate_average_confidence([]) == 100.0
    assert calculator.calculate_sequence_entropy([]) == 0.0
