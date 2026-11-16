from click.testing import CliRunner
import pytest

from token_inspector.cli.main import cli


def test_cli_inspect_text_and_table_output() -> None:
    # Arrange
    runner = CliRunner()
    prompt = "Hello world! Test prompt."

    # Act
    result = runner.invoke(cli, ["inspect", prompt, "--model", "gpt-4o"])

    # Assert
    assert result.exit_code == 0
    # Summary assertions
    assert "Tokens:" in result.output or "Token Count" in result.output
    assert "gpt-4o" in result.output
    # Token IDs and table elements present
    assert "Hello" in result.output
    assert "world" in result.output


def test_cli_inspect_from_file(tmp_path) -> None:
    # Arrange
    test_file = tmp_path / "sample.txt"
    test_file.write_text("Context from file for inspection.", encoding="utf-8")
    runner = CliRunner()

    # Act
    result = runner.invoke(cli, ["inspect", "--file", str(test_file), "--model", "gpt-4o"])

    # Assert
    assert result.exit_code == 0
    assert "inspection" in result.output
    assert "Tokens:" in result.output or "Token Count" in result.output
