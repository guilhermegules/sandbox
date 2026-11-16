from typing import Any, Dict, List
import pytest

from token_inspector.tokenizer.format_analyzer import FormatAnalyzer
from token_inspector.models.format_schemas import FormatBenchmarkResult


def test_format_analyzer_benchmark_formats() -> None:
    # Arrange: 50 records with repeated keys
    records: List[Dict[str, Any]] = [
        {"id": i, "name": f"User_{i}", "email": f"user{i}@example.com", "role": "engineer"}
        for i in range(50)
    ]
    analyzer = FormatAnalyzer()

    # Act
    result = analyzer.benchmark_formats(records, model="gpt-4o", baseline_format="json_indented")

    # Assert
    assert isinstance(result, FormatBenchmarkResult)
    assert result.model == "gpt-4o"
    assert len(result.formats) == 4

    format_names = [f.format_name for f in result.formats]
    assert "json_indented" in format_names
    assert "json_minified" in format_names
    assert "yaml" in format_names
    assert "markdown_table" in format_names

    # json_indented should have the highest token count
    indented = next(f for f in result.formats if f.format_name == "json_indented")
    minified = next(f for f in result.formats if f.format_name == "json_minified")
    markdown = next(f for f in result.formats if f.format_name == "markdown_table")

    assert minified.token_count < indented.token_count
    assert markdown.token_count < indented.token_count
    assert markdown.token_savings_pct > 30.0  # Significant token savings

    # Key bloat report
    assert len(result.key_bloat) >= 4
    keys_found = {k.key_name for k in result.key_bloat}
    assert "email" in keys_found
    assert "name" in keys_found
    assert result.winner_format in ("yaml", "markdown_table")
