from typing import Any, Dict, List
import math

from token_inspector.models.sampling_schemas import CandidateToken, EvaluatedToken


class LogprobEvaluator:
    """Evaluates token log probabilities, converts to percentages, and classifies confidence tiers."""

    @staticmethod
    def logprob_to_probability(logprob: float) -> float:
        """Convert natural log probability to probability percentage (0-100%)."""
        try:
            prob = math.exp(logprob)
            return min(100.0, max(0.0, prob * 100.0))
        except OverflowError:
            return 0.0

    @staticmethod
    def get_confidence_tier(probability_pct: float) -> str:
        """Classify confidence into high, moderate, or uncertain tiers."""
        if probability_pct >= 90.0:
            return "high"
        elif probability_pct >= 50.0:
            return "moderate"
        else:
            return "uncertain"

    def evaluate_tokens(self, raw_tokens: List[Dict[str, Any]]) -> List[EvaluatedToken]:
        """Convert raw token logprob dictionaries into typed EvaluatedToken items."""
        evaluated: List[EvaluatedToken] = []

        for idx, item in enumerate(raw_tokens):
            token_str = str(item.get("token", ""))
            logprob_val = float(item.get("logprob", 0.0))
            prob_pct = self.logprob_to_probability(logprob_val)
            tier = self.get_confidence_tier(prob_pct)

            candidates: List[CandidateToken] = []
            for top_item in item.get("top_logprobs", []):
                top_token = str(top_item.get("token", ""))
                top_lp = float(top_item.get("logprob", 0.0))
                top_pct = self.logprob_to_probability(top_lp)
                candidates.append(
                    CandidateToken(
                        token=top_token,
                        logprob=top_lp,
                        probability_pct=round(top_pct, 4),
                    )
                )

            evaluated.append(
                EvaluatedToken(
                    index=idx,
                    token=token_str,
                    logprob=logprob_val,
                    probability_pct=round(prob_pct, 4),
                    confidence_tier=tier,
                    top_candidates=candidates,
                )
            )

        return evaluated
