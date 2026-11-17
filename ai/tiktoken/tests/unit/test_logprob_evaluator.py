import math
import pytest

from token_inspector.sampling.logprob_evaluator import LogprobEvaluator


def test_logprob_evaluator_probability_and_confidence_tiers() -> None:
    # Arrange
    raw_tokens = [
        {"token": "The", "logprob": 0.0},        # 100% -> high
        {"token": " capital", "logprob": -0.05},  # ~95.12% -> high
        {"token": " is", "logprob": -0.40},       # ~67.03% -> moderate
        {"token": " Canberra", "logprob": -1.20}, # ~30.12% -> uncertain
    ]
    evaluator = LogprobEvaluator()

    # Act
    evaluated = evaluator.evaluate_tokens(raw_tokens)

    # Assert
    assert len(evaluated) == 4

    # 1. logprob 0.0 -> P = 1.0 (100%), high
    assert evaluated[0].probability_pct == pytest.approx(100.0, rel=1e-3)
    assert evaluated[0].confidence_tier == "high"

    # 2. logprob -0.05 -> P ~ 95.12%, high
    expected_p2 = math.exp(-0.05) * 100.0
    assert evaluated[1].probability_pct == pytest.approx(expected_p2, rel=1e-3)
    assert evaluated[1].confidence_tier == "high"

    # 3. logprob -0.40 -> P ~ 67.03%, moderate
    expected_p3 = math.exp(-0.40) * 100.0
    assert evaluated[2].probability_pct == pytest.approx(expected_p3, rel=1e-3)
    assert evaluated[2].confidence_tier == "moderate"

    # 4. logprob -1.20 -> P ~ 30.12%, uncertain
    expected_p4 = math.exp(-1.20) * 100.0
    assert evaluated[3].probability_pct == pytest.approx(expected_p4, rel=1e-3)
    assert evaluated[3].confidence_tier == "uncertain"


def test_logprob_evaluator_top_candidates() -> None:
    # Arrange
    raw_tokens = [
        {
            "token": " Canberra",
            "logprob": -0.40,
            "top_logprobs": [
                {"token": " Canberra", "logprob": -0.40},
                {"token": " Sydney", "logprob": -1.10},
            ],
        }
    ]
    evaluator = LogprobEvaluator()

    # Act
    evaluated = evaluator.evaluate_tokens(raw_tokens)

    # Assert
    assert len(evaluated[0].top_candidates) == 2
    assert evaluated[0].top_candidates[0].token == " Canberra"
    assert evaluated[0].top_candidates[1].token == " Sydney"
    assert evaluated[0].top_candidates[1].probability_pct < evaluated[0].top_candidates[0].probability_pct
