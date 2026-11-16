from pathlib import Path
import json
from click.testing import CliRunner
import pytest

from token_inspector.cli.main import cli


def test_cli_budget_pruning_and_diff(tmp_path: Path) -> None:
    # Arrange: messages list with > 1000 tokens
    messages = [
        {"role": "system", "content": "You are a concise assistant.", "priority": 1},
        {"role": "user", "content": "Question 1: " + ("data " * 150), "priority": 4},
        {"role": "assistant", "content": "Answer 1: " + ("response " * 150), "priority": 4},
        {"role": "user", "content": "Question 2: " + ("more data " * 150), "priority": 4},
        {"role": "assistant", "content": "Answer 2: " + ("more response " * 150), "priority": 4},
        {"role": "user", "content": "Latest user query: Summarize findings.", "priority": 2},
    ]
    context_file = tmp_path / "context.json"
    context_file.write_text(json.dumps(messages), encoding="utf-8")

    runner = CliRunner()

    # Act
    result = runner.invoke(
        cli,
        ["budget", "--file", str(context_file), "--max-tokens", "400", "--model", "gpt-4o"],
    )

    # Assert
    assert result.exit_code == 0
    # Output displays token savings diff
    assert "Tokens Saved" in result.output or "tokens saved" in result.output.lower()
    assert "Truncated" in result.output or "truncated" in result.output.lower()
    assert "Latest user query" in result.output
