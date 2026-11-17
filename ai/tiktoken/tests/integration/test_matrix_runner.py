from typing import Any, Dict
import httpx
import pytest

from token_inspector.models.sampling_schemas import SamplingMatrixConfig, SamplingMatrixReport
from token_inspector.sampling.matrix_runner import MatrixRunner


@pytest.mark.anyio
async def test_matrix_runner_executes_permutations_and_detects_divergence() -> None:
    # Arrange: Mock transport simulating OpenAI chat completions endpoint
    call_counts: Dict[str, int] = {"rate_limits_hit": 0}

    def mock_handler(request: httpx.Request) -> httpx.Response:
        import json

        data = json.loads(request.content.decode("utf-8"))
        temp = data.get("temperature", 0.0)

        # Simulate 429 rate limit once on temp=0.7 to verify backoff retry
        if temp == 0.7 and call_counts["rate_limits_hit"] == 0:
            call_counts["rate_limits_hit"] += 1
            return httpx.Response(429, headers={"Retry-After": "0.01"})

        # Return divergent text for temp 0.7
        word = "Sydney" if temp > 0.0 else "Canberra"
        response_data = {
            "choices": [
                {
                    "message": {"role": "assistant", "content": f"The capital is {word}."},
                    "logprobs": {
                        "content": [
                            {"token": "The", "logprob": 0.0},
                            {"token": " capital", "logprob": -0.01},
                            {"token": " is", "logprob": 0.0},
                            {"token": f" {word}", "logprob": -0.1 if temp == 0.0 else -0.8},
                            {"token": ".", "logprob": 0.0},
                        ]
                    },
                }
            ]
        }
        return httpx.Response(200, json=response_data)

    transport = httpx.MockTransport(mock_handler)
    async with httpx.AsyncClient(transport=transport) as client:
        runner = MatrixRunner(client=client, base_url="http://testserver/v1")
        config = SamplingMatrixConfig(
            temperatures=[0.0, 0.7],
            top_ps=[0.9, 1.0],
            max_tokens=64,
            model="gpt-4o",
            concurrency_limit=2,
        )

        # Act
        report = await runner.run_matrix(prompt="The capital is", config=config)

    # Assert
    assert isinstance(report, SamplingMatrixReport)
    assert len(report.trials) == 4  # 2 temps x 2 top_ps
    assert call_counts["rate_limits_hit"] == 1  # 429 backoff was handled

    # Check that trials have perplexity and tokens
    for trial in report.trials:
        assert trial.perplexity >= 1.0
        assert trial.average_confidence_pct > 0.0
        assert len(trial.tokens) == 5

    # Check divergence points detected between baseline (Canberra) and temp 0.7 (Sydney)
    assert len(report.divergence_points) > 0
    divergence = report.divergence_points[0]
    assert divergence.token_index == 3
    assert "Canberra" in divergence.baseline_token
    assert "Sydney" in divergence.divergent_token
