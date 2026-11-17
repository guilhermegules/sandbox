from unittest.mock import AsyncMock, patch
from click.testing import CliRunner
import pytest

from token_inspector.cli.main import cli
from token_inspector.models.sampling_schemas import (
    CandidateToken,
    DivergencePoint,
    EvaluatedToken,
    SamplingMatrixReport,
    SamplingTrialResult,
)


def test_cli_compare_displays_metrics_and_divergence() -> None:
    # Arrange
    runner = CliRunner()
    mock_report = SamplingMatrixReport(
        prompt="The capital of Australia is",
        model="gpt-4o",
        trials=[
            SamplingTrialResult(
                trial_id="trial_t0.0_p1.0",
                temperature=0.0,
                top_p=1.0,
                output_text="The capital of Australia is Canberra.",
                tokens=[],
                perplexity=1.042,
                average_confidence_pct=96.5,
                divergence_token_index=None,
            ),
            SamplingTrialResult(
                trial_id="trial_t0.7_p1.0",
                temperature=0.7,
                top_p=1.0,
                output_text="The capital of Australia is Sydney.",
                tokens=[],
                perplexity=1.854,
                average_confidence_pct=64.2,
                divergence_token_index=5,
            ),
        ],
        divergence_points=[
            DivergencePoint(
                token_index=5,
                baseline_token=" Canberra",
                divergent_token=" Sydney",
                divergence_reason="Alternative capital name chosen under temp 0.7",
                candidate_tokens=[
                    CandidateToken(token=" Canberra", logprob=-0.2, probability_pct=81.8),
                    CandidateToken(token=" Sydney", logprob=-1.7, probability_pct=18.2),
                ],
            )
        ],
    )

    # Act
    with patch("token_inspector.cli.compare_command.MatrixRunner.run_matrix", new_callable=AsyncMock) as mock_run:
        mock_run.return_value = mock_report
        result = runner.invoke(
            cli,
            ["compare", "--prompt", "The capital of Australia is", "--temperatures", "0.0,0.7"],
        )

    # Assert
    assert result.exit_code == 0
    assert "Perplexity" in result.output
    assert "Canberra" in result.output
    assert "Sydney" in result.output
    assert "Divergence" in result.output or "divergence" in result.output.lower()
