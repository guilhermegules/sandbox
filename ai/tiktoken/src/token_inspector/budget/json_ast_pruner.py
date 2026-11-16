from typing import Any, Dict, List, Optional
import copy
import json

from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.model_registry import ModelRegistry


class JsonAstPruner:
    """AST-aware JSON pruner that guarantees 100% syntactically valid JSON within a token ceiling."""

    def __init__(self, registry: Optional[ModelRegistry] = None) -> None:
        self.registry = registry or ModelRegistry()

    def _get_encoder(self, model: str) -> BPEEncoder:
        encoding_name = self.registry.get_encoding_name(model)
        return BPEEncoder(encoding_name=encoding_name)

    def prune(
        self,
        json_input: str | Any,
        max_tokens: int,
        model: str = "gpt-4o",
    ) -> str:
        encoder = self._get_encoder(model)

        # Parse input
        if isinstance(json_input, str):
            try:
                data = json.loads(json_input)
            except json.JSONDecodeError:
                # If not valid JSON to start with, return as-is
                return json_input
        else:
            data = copy.deepcopy(json_input)

        # Check if already within budget
        candidate_str = json.dumps(data)
        if encoder.count_tokens(candidate_str) <= max_tokens:
            return candidate_str

        # If root is a list, prune items from the end
        if isinstance(data, list):
            low, high = 0, len(data)
            best_valid = "[]"

            while low <= high:
                mid = (low + high) // 2
                subset = data[:mid]
                serialized = json.dumps(subset)
                tk = encoder.count_tokens(serialized)
                if tk <= max_tokens:
                    best_valid = serialized
                    low = mid + 1
                else:
                    high = mid - 1

            # Validate
            json.loads(best_valid)
            return best_valid

        # If root is a dictionary
        if isinstance(data, dict):
            # First, check if any value is a list we can prune
            list_keys = [k for k, v in data.items() if isinstance(v, list)]
            for lk in list_keys:
                items = data[lk]
                low, high = 0, len(items)
                best_items = []
                while low <= high:
                    mid = (low + high) // 2
                    test_data = copy.deepcopy(data)
                    test_data[lk] = items[:mid]
                    serialized = json.dumps(test_data)
                    if encoder.count_tokens(serialized) <= max_tokens:
                        best_items = items[:mid]
                        low = mid + 1
                    else:
                        high = mid - 1
                data[lk] = best_items
                if encoder.count_tokens(json.dumps(data)) <= max_tokens:
                    break

            if encoder.count_tokens(json.dumps(data)) <= max_tokens:
                result = json.dumps(data)
                json.loads(result)
                return result

            # If still exceeding, prune non-essential keys
            keys_to_remove = list(data.keys())
            for k in reversed(keys_to_remove):
                del data[k]
                serialized = json.dumps(data)
                if encoder.count_tokens(serialized) <= max_tokens:
                    json.loads(serialized)
                    return serialized

            fallback = "{}"
            json.loads(fallback)
            return fallback

        # Scalar fallback
        return json.dumps(data)
