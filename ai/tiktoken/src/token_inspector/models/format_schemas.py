from typing import Any, List
from pydantic import BaseModel, Field


class FormatMetric(BaseModel):
    format_name: str = Field(..., description="json_indented | json_minified | yaml | markdown_table")
    token_count: int
    byte_count: int
    char_count: int
    token_to_byte_ratio: float
    token_savings_pct: float = Field(0.0, description="Percentage savings relative to baseline")
    cost_per_million_calls_usd: float


class KeyBloatItem(BaseModel):
    key_name: str
    occurrences: int
    tokens_per_key: int
    total_token_overhead: int
    overhead_percentage: float


class FormatBenchmarkResult(BaseModel):
    model: str
    baseline_format: str = "json_indented"
    formats: List[FormatMetric]
    winner_format: str
    key_bloat: List[KeyBloatItem]
    recommendation: str
