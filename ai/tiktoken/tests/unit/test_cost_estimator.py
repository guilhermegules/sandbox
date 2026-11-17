import pytest
from token_inspector.tokenizer.cost_estimator import CostEstimator


def test_cost_estimator_gpt4o_calculation() -> None:
    # Arrange
    estimator = CostEstimator()

    # Act
    # 1420 * 2.50 / 1,000,000 = 0.00355
    # 422 * 10.00 / 1,000,000 = 0.00422
    # Total = 0.00777
    cost = estimator.calculate_cost(prompt_tokens=1420, completion_tokens=422, model="gpt-4o")

    # Assert
    assert cost == pytest.approx(0.00777, rel=1e-5)


def test_cost_estimator_gpt35_turbo() -> None:
    # Arrange
    estimator = CostEstimator()

    # Act
    cost = estimator.calculate_cost(prompt_tokens=1000, completion_tokens=1000, model="gpt-3.5-turbo")

    # Assert
    # 1000 * 0.50 / 1M = 0.0005
    # 1000 * 1.50 / 1M = 0.0015
    # Total = 0.002
    assert cost == pytest.approx(0.002, rel=1e-5)


def test_cost_estimator_custom_pricing_registration() -> None:
    # Arrange
    estimator = CostEstimator()
    estimator.register_pricing(model="my-special-llm", prompt_per_1m=5.0, completion_per_1m=20.0)

    # Act
    cost = estimator.calculate_cost(prompt_tokens=1000000, completion_tokens=1000000, model="my-special-llm")

    # Assert
    assert cost == pytest.approx(25.0)
