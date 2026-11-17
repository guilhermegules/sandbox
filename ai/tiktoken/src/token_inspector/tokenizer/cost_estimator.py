from typing import Dict, Tuple


class CostEstimator:
    """Estimates monetary API cost (in USD) based on token usage and model pricing."""

    def __init__(self) -> None:
        # Format: model -> (prompt_price_per_1m, completion_price_per_1m)
        self._pricing: Dict[str, Tuple[float, float]] = {
            "gpt-4o": (2.50, 10.00),
            "gpt-4o-mini": (0.15, 0.60),
            "gpt-4-turbo": (10.00, 30.00),
            "gpt-4": (30.00, 60.00),
            "gpt-3.5-turbo": (0.50, 1.50),
            "o1": (15.00, 60.00),
            "o1-mini": (3.00, 12.00),
            "o3-mini": (1.10, 4.40),
            "text-embedding-3-small": (0.02, 0.00),
            "text-embedding-3-large": (0.13, 0.00),
            "text-embedding-ada-002": (0.10, 0.00),
        }
        self.default_pricing: Tuple[float, float] = (2.50, 10.00)

    def register_pricing(self, model: str, prompt_per_1m: float, completion_per_1m: float) -> None:
        """Register or override pricing for a model."""
        self._pricing[model] = (prompt_per_1m, completion_per_1m)

    def get_pricing(self, model: str) -> Tuple[float, float]:
        """Look up prompt and completion prices per 1M tokens."""
        if model in self._pricing:
            return self._pricing[model]
        # Match by prefix
        for key, prices in self._pricing.items():
            if model.startswith(key):
                return prices
        return self.default_pricing

    def calculate_cost(
        self, prompt_tokens: int, completion_tokens: int = 0, model: str = "gpt-4o"
    ) -> float:
        """Calculate total USD cost for prompt and completion tokens."""
        prompt_rate, completion_rate = self.get_pricing(model)
        prompt_cost = (prompt_tokens * prompt_rate) / 1_000_000.0
        completion_cost = (completion_tokens * completion_rate) / 1_000_000.0
        return round(prompt_cost + completion_cost, 6)
