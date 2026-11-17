from collections import Counter
from typing import Any, Dict, List, Optional
import json
import yaml

from token_inspector.models.format_schemas import (
    FormatBenchmarkResult,
    FormatMetric,
    KeyBloatItem,
)
from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.cost_estimator import CostEstimator
from token_inspector.tokenizer.model_registry import ModelRegistry


class FormatAnalyzer:
    """Analyzes and benchmarks data serialization efficiency across formats (JSON, YAML, Markdown)."""

    def __init__(
        self,
        registry: Optional[ModelRegistry] = None,
        cost_estimator: Optional[CostEstimator] = None,
    ) -> None:
        self.registry = registry or ModelRegistry()
        self.cost_estimator = cost_estimator or CostEstimator()

    def serialize_json_indented(self, data: Any) -> str:
        return json.dumps(data, indent=2)

    def serialize_json_minified(self, data: Any) -> str:
        return json.dumps(data, separators=(",", ":"))

    def serialize_yaml(self, data: Any) -> str:
        return yaml.dump(data, sort_keys=False)

    def serialize_markdown_table(self, data: Any) -> str:
        if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
            # Extract union of all keys preserving order
            keys: List[str] = []
            for item in data:
                if isinstance(item, dict):
                    for k in item.keys():
                        if k not in keys:
                            keys.append(str(k))
            if keys:
                header_line = "| " + " | ".join(keys) + " |"
                sep_line = "| " + " | ".join(["---"] * len(keys)) + " |"
                rows = [
                    "| "
                    + " | ".join(
                        str(item.get(k, "")).replace("\n", " ").replace("|", "\\|") for k in keys
                    )
                    + " |"
                    for item in data
                    if isinstance(item, dict)
                ]
                return "\n".join([header_line, sep_line] + rows)

        if isinstance(data, dict):
            header_line = "| Key | Value |"
            sep_line = "| --- | --- |"
            rows = [
                f"| {str(k)} | {str(v).replace(chr(10), ' ').replace('|', r'\|')} |"
                for k, v in data.items()
            ]
            return "\n".join([header_line, sep_line] + rows)

        return str(data)

    def analyze_key_bloat(
        self, data: Any, encoder: BPEEncoder, baseline_tokens: int
    ) -> List[KeyBloatItem]:
        counter: Counter[str] = Counter()

        def _traverse(obj: Any) -> None:
            if isinstance(obj, dict):
                for k, v in obj.items():
                    counter[str(k)] += 1
                    _traverse(v)
            elif isinstance(obj, list):
                for item in obj:
                    _traverse(item)

        _traverse(data)

        items: List[KeyBloatItem] = []
        for key, count in counter.most_common():
            key_tokens = max(1, encoder.count_tokens(key))
            total_overhead = count * key_tokens
            pct = (
                round((total_overhead / baseline_tokens) * 100.0, 2)
                if baseline_tokens > 0
                else 0.0
            )
            items.append(
                KeyBloatItem(
                    key_name=key,
                    occurrences=count,
                    tokens_per_key=key_tokens,
                    total_token_overhead=total_overhead,
                    overhead_percentage=pct,
                )
            )
        return items

    def benchmark_formats(
        self,
        data: Any,
        model: str = "gpt-4o",
        baseline_format: str = "json_indented",
    ) -> FormatBenchmarkResult:
        encoding_name = self.registry.get_encoding_name(model)
        encoder = BPEEncoder(encoding_name=encoding_name)
        prompt_rate, _ = self.cost_estimator.get_pricing(model)

        serialized_map = {
            "json_indented": self.serialize_json_indented(data),
            "json_minified": self.serialize_json_minified(data),
            "yaml": self.serialize_yaml(data),
            "markdown_table": self.serialize_markdown_table(data),
        }

        # Baseline count
        baseline_text = serialized_map.get(baseline_format, serialized_map["json_indented"])
        baseline_tokens = encoder.count_tokens(baseline_text)

        metrics: List[FormatMetric] = []
        for name, text in serialized_map.items():
            t_count = encoder.count_tokens(text)
            b_count = len(text.encode("utf-8"))
            c_count = len(text)
            ratio = round(t_count / b_count, 4) if b_count > 0 else 0.0
            savings = (
                round(((baseline_tokens - t_count) / baseline_tokens) * 100.0, 2)
                if baseline_tokens > 0
                else 0.0
            )
            cost_per_m = round(t_count * prompt_rate, 4)

            metrics.append(
                FormatMetric(
                    format_name=name,
                    token_count=t_count,
                    byte_count=b_count,
                    char_count=c_count,
                    token_to_byte_ratio=ratio,
                    token_savings_pct=savings,
                    cost_per_million_calls_usd=cost_per_m,
                )
            )

        winner = min(metrics, key=lambda m: m.token_count)
        key_bloat = self.analyze_key_bloat(data, encoder, baseline_tokens)

        rec = (
            f"Using '{winner.format_name}' reduces token consumption by {winner.token_savings_pct}% "
            f"compared to '{baseline_format}', saving ${winner.cost_per_million_calls_usd:.2f} per 1M calls."
        )

        return FormatBenchmarkResult(
            model=model,
            baseline_format=baseline_format,
            formats=metrics,
            winner_format=winner.format_name,
            key_bloat=key_bloat,
            recommendation=rec,
        )
