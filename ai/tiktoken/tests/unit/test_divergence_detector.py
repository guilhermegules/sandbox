import pytest

from token_inspector.models.sampling_schemas import CandidateToken, EvaluatedToken
from token_inspector.sampling.divergence_detector import DivergenceDetector


def test_divergence_detector_with_token_strings() -> None:
    # Arrange
    baseline = ["The", " capital", " is", " Canberra"]
    trial = ["The", " capital", " is", " Sydney"]
    detector = DivergenceDetector()

    # Act
    divergence = detector.find_divergence(baseline, trial)

    # Assert
    assert divergence is not None
    assert divergence.token_index == 3
    assert divergence.baseline_token == " Canberra"
    assert divergence.divergent_token == " Sydney"


def test_divergence_detector_with_evaluated_tokens_and_candidates() -> None:
    # Arrange
    cand1 = CandidateToken(token=" Canberra", logprob=-0.2, probability_pct=81.8)
    cand2 = CandidateToken(token=" Sydney", logprob=-1.7, probability_pct=18.2)

    base_tokens = [
        EvaluatedToken(index=0, token="The", logprob=0.0, probability_pct=100.0, confidence_tier="high"),
        EvaluatedToken(index=1, token=" capital", logprob=-0.01, probability_pct=99.0, confidence_tier="high"),
        EvaluatedToken(index=2, token=" is", logprob=0.0, probability_pct=100.0, confidence_tier="high"),
        EvaluatedToken(index=3, token=" Canberra", logprob=-0.2, probability_pct=81.8, confidence_tier="moderate", top_candidates=[cand1, cand2]),
    ]
    trial_tokens = [
        EvaluatedToken(index=0, token="The", logprob=0.0, probability_pct=100.0, confidence_tier="high"),
        EvaluatedToken(index=1, token=" capital", logprob=-0.01, probability_pct=99.0, confidence_tier="high"),
        EvaluatedToken(index=2, token=" is", logprob=0.0, probability_pct=100.0, confidence_tier="high"),
        EvaluatedToken(index=3, token=" Sydney", logprob=-1.7, probability_pct=18.2, confidence_tier="uncertain", top_candidates=[cand1, cand2]),
    ]
    detector = DivergenceDetector()

    # Act
    point = detector.find_divergence(base_tokens, trial_tokens)

    # Assert
    assert point is not None
    assert point.token_index == 3
    assert point.baseline_token == " Canberra"
    assert point.divergent_token == " Sydney"
    assert len(point.candidate_tokens) == 2


def test_divergence_detector_identical_sequences() -> None:
    # Arrange
    seq = ["Hello", " world"]
    detector = DivergenceDetector()

    # Act
    point = detector.find_divergence(seq, seq)

    # Assert
    assert point is None
