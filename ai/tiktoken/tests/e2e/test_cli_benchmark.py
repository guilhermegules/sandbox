from pathlib import Path
import json
from click.testing import CliRunner
import pytest

from token_inspector.cli.main import cli


def test_cli_benchmark_file(tmp_path: Path) -> None:
    # Arrange: 20 user records in JSON
    records = [
        {"id": i, "name": f"User_{i}", "email": f"user{i}@test.com", "role": "admin"}
        for i in range(20)
    ]
    fixture_path = tmp_path / "fixture.json"
    fixture_path.write_text(json.dumps(records), encoding="utf-8")

    runner = CliRunner()

    # Act
    result = runner.invoke(cli, ["benchmark", "--file", str(fixture_path), "--model", "gpt-4o"])

    # Assert
    assert result.exit_code == 0
    # Output contains format names
    assert "json_indented" in result.output
    assert "json_minified" in result.output
    assert "yaml" in result.output
    assert "markdown_table" in result.output
    # Output contains recommendation / savings summary
    assert "savings" in result.output.lower() or "winner" in result.output.lower() or "reduces" in result.output.lower()
