from typing import List, Optional, Union
from token_inspector.models.sampling_schemas import (
    CandidateToken,
    DivergencePoint,
    EvaluatedToken,
)


class DivergenceDetector:
    """Detects the point of semantic branching and divergence between generated token sequences."""

    @staticmethod
    def _get_token_text(token: Union[str, EvaluatedToken]) -> str:
        return token.token if isinstance(token, EvaluatedToken) else str(token)

    @staticmethod
    def _get_candidates(token: Union[str, EvaluatedToken]) -> List[CandidateToken]:
        return token.top_candidates if isinstance(token, EvaluatedToken) else []

    def find_divergence(
        self,
        baseline: Union[List[str], List[EvaluatedToken]],
        trial: Union[List[str], List[EvaluatedToken]],
        reason: Optional[str] = None,
    ) -> Optional[DivergencePoint]:
        """Find the first token index where baseline and trial sequences diverge."""
        min_len = min(len(baseline), len(trial))

        for idx in range(min_len):
            b_text = self._get_token_text(baseline[idx])
            t_text = self._get_token_text(trial[idx])

            if b_text != t_text:
                candidates = self._get_candidates(trial[idx])
                desc = (
                    reason
                    or f"Divergence at token {idx}: '{b_text.strip()}' vs '{t_text.strip()}'"
                )
                return DivergencePoint(
                    token_index=idx,
                    baseline_token=b_text,
                    divergent_token=t_text,
                    divergence_reason=desc,
                    candidate_tokens=candidates,
                )

        if len(baseline) != len(trial):
            idx = min_len
            b_text = self._get_token_text(baseline[idx]) if idx < len(baseline) else "<END>"
            t_text = self._get_token_text(trial[idx]) if idx < len(trial) else "<END>"
            candidates = self._get_candidates(trial[idx]) if idx < len(trial) else []
            return DivergencePoint(
                token_index=idx,
                baseline_token=b_text,
                divergent_token=t_text,
                divergence_reason=f"Length divergence at token {idx}",
                candidate_tokens=candidates,
            )

        return None
