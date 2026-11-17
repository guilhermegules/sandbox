from typing import List
import math


class PerplexityCalculator:
    """Calculates sequence perplexity, sequence entropy, and confidence metrics."""

    @staticmethod
    def calculate_perplexity(logprobs: List[float]) -> float:
        """Calculate sequence perplexity exp(-1/N * sum(ln P))."""
        if not logprobs:
            return 1.0

        mean_logprob = sum(logprobs) / len(logprobs)
        try:
            return float(math.exp(-mean_logprob))
        except OverflowError:
            return float("inf")

    @staticmethod
    def calculate_average_confidence(logprobs: List[float]) -> float:
        """Calculate average token probability percentage."""
        if not logprobs:
            return 100.0

        probs = [math.exp(lp) * 100.0 for lp in logprobs]
        return float(sum(probs) / len(probs))

    @staticmethod
    def calculate_sequence_entropy(logprobs: List[float]) -> float:
        """Calculate average negative log-likelihood (sequence entropy in nats)."""
        if not logprobs:
            return 0.0

        return float(-sum(logprobs) / len(logprobs))
