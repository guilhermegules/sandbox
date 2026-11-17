import pytest

from token_inspector.models.sampling_schemas import (
    CandidateToken,
    DivergencePoint,
    EvaluatedToken,
    SamplingMatrixConfig,
    SamplingMatrixReport,
    SamplingTrialResult,
)


def test_sampling_schemas_serialization_and_precision() -> None:
    # Arrange
    cand1 = CandidateToken(token=" Paris", logprob=-0.0512938, probability_pct=95.0001)
    cand2 = CandidateToken(token=" London", logprob=-3.12938, probability_pct=4.3735)

    evaluated = EvaluatedToken(
        index=0,
        token=" Paris",
        logprob=-0.0512938,
        probability_pct=95.0001,
        confidence_tier="high",
        top_candidates=[cand1, cand2],
    )

    trial = SamplingTrialResult(
        trial_id="trial_temp_0.0",
        temperature=0.0,
        top_p=1.0,
        output_text=" Paris",
        tokens=[evaluated],
        perplexity=1.0526,
        average_confidence_pct=95.0,
        divergence_token_index=None,
    )

    # Act
    json_repr = trial.model_dump_json()
    reconstructed = SamplingTrialResult.model_validate_json(json_repr)

    # Assert
    assert reconstructed.trial_id == "trial_temp_0.0"
    assert reconstructed.tokens[0].confidence_tier == "high"
    assert reconstructed.tokens[0].logprob == pytest.approx(-0.0512938)
    assert len(reconstructed.tokens[0].top_candidates) == 2


def test_sampling_matrix_report_validation() -> None:
    # Arrange
    div = DivergencePoint(
        token_index=2,
        baseline_token=" Canberra",
        divergent_token=" Sydney",
        divergence_reason="Alternative capital name sampled under high temperature",
        candidate_tokens=[],
    )
    report = SamplingMatrixReport(
        prompt="The capital is",
        model="gpt-4o",
        trials=[],
        divergence_points=[div],
    )

    # Act
    json_out = report.model_dump_json()
    reconstructed = SamplingMatrixReport.model_validate_json(json_out)

    # Assert
    assert len(reconstructed.divergence_points) == 1
    assert reconstructed.divergence_points[0].token_index == 2
    assert reconstructed.divergence_points[0].divergent_token == " Sydney"
