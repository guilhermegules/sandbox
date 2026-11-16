from typing import List, Optional
from pydantic import BaseModel, Field


class CandidateToken(BaseModel):
    token: str
    logprob: float
    probability_pct: float


class EvaluatedToken(BaseModel):
    index: int
    token: str
    logprob: float
    probability_pct: float
    confidence_tier: str = Field(..., description="high (>90%) | moderate (50-90%) | uncertain (<50%)")
    top_candidates: List[CandidateToken] = Field(default_factory=list)


class SamplingTrialResult(BaseModel):
    trial_id: str
    temperature: float
    top_p: float
    output_text: str
    tokens: List[EvaluatedToken]
    perplexity: float
    average_confidence_pct: float
    divergence_token_index: Optional[int] = None


class DivergencePoint(BaseModel):
    token_index: int
    baseline_token: str
    divergent_token: str
    divergence_reason: str
    candidate_tokens: List[CandidateToken] = Field(default_factory=list)


class SamplingMatrixConfig(BaseModel):
    temperatures: List[float] = Field(default_factory=lambda: [0.0, 0.7])
    top_ps: List[float] = Field(default_factory=lambda: [1.0])
    max_tokens: int = 128
    model: str = "gpt-4o"
    concurrency_limit: int = 4


class SamplingMatrixReport(BaseModel):
    prompt: str
    model: str
    trials: List[SamplingTrialResult] = Field(default_factory=list)
    divergence_points: List[DivergencePoint] = Field(default_factory=list)
