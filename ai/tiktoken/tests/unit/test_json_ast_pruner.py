from typing import Any, Dict, List
import json
import pytest

from token_inspector.budget.json_ast_pruner import JsonAstPruner
from token_inspector.tokenizer.bpe_encoder import BPEEncoder


def test_json_ast_pruner_prunes_large_list_to_valid_json() -> None:
    # Arrange: 100 objects in a list
    large_dataset: List[Dict[str, Any]] = [
        {"id": i, "title": f"Task item number {i}", "description": "A" * 50}
        for i in range(100)
    ]
    raw_json = json.dumps(large_dataset, indent=2)
    encoder = BPEEncoder(encoding_name="cl100k_base")
    original_tokens = encoder.count_tokens(raw_json)
    assert original_tokens > 1000

    target_tokens = 300
    pruner = JsonAstPruner()

    # Act
    pruned_json = pruner.prune(raw_json, max_tokens=target_tokens, model="gpt-4o")

    # Assert
    # 1. Output MUST be 100% valid JSON
    parsed = json.loads(pruned_json)
    assert isinstance(parsed, list)
    assert len(parsed) < 100
    assert len(parsed) > 0

    # 2. Token count must be within target_tokens
    pruned_tokens = encoder.count_tokens(pruned_json)
    assert pruned_tokens <= target_tokens


def test_json_ast_pruner_nested_dict() -> None:
    # Arrange: nested dict with records
    nested_data: Dict[str, Any] = {
        "status": "success",
        "metadata": {"version": "1.0", "page": 1},
        "records": [{"index": i, "data": "X" * 40} for i in range(50)],
    }
    raw_json = json.dumps(nested_data)
    pruner = JsonAstPruner()
    target_tokens = 150

    # Act
    pruned_json = pruner.prune(raw_json, max_tokens=target_tokens, model="gpt-4o")

    # Assert
    parsed = json.loads(pruned_json)
    assert isinstance(parsed, dict)
    assert "records" in parsed
    assert len(parsed["records"]) < 50
    encoder = BPEEncoder(encoding_name="o200k_base")
    assert encoder.count_tokens(pruned_json) <= target_tokens
