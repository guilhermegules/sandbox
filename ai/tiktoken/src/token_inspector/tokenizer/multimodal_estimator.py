import math
from typing import Any, Dict, Optional


class MultimodalEstimator:
    """Estimates token overhead for multimodal image inputs based on tile formulas."""

    BASE_TOKENS: int = 85
    TOKENS_PER_TILE: int = 170
    TILE_SIZE: int = 512

    def estimate_image_tokens(
        self,
        width: Optional[int] = None,
        height: Optional[int] = None,
        detail: str = "high",
    ) -> int:
        """Estimate tokens for an image given dimensions and detail level ('low' | 'high' | 'auto')."""
        if detail == "low":
            return self.BASE_TOKENS

        # Default dimensions if unknown (standard 1024x1024)
        w = width if width is not None and width > 0 else 1024
        h = height if height is not None and height > 0 else 1024

        tiles_x = math.ceil(w / self.TILE_SIZE)
        tiles_y = math.ceil(h / self.TILE_SIZE)
        total_tiles = tiles_x * tiles_y

        return self.BASE_TOKENS + (total_tiles * self.TOKENS_PER_TILE)

    def estimate_payload_tokens(self, payload: Dict[str, Any]) -> int:
        """Parse OpenAI image content payload and calculate estimated tokens."""
        item_type = payload.get("type", "")
        if item_type != "image_url":
            return 0

        image_url_info = payload.get("image_url", {})
        detail = "high"
        if isinstance(image_url_info, dict):
            detail = image_url_info.get("detail", "high")

        width = payload.get("width")
        height = payload.get("height")

        return self.estimate_image_tokens(width=width, height=height, detail=detail)
