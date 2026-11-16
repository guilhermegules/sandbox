from typing import List, Tuple
from token_inspector.models.token_item import TokenItem


class BoundaryVisualizer:
    """Renders token sequences with cycling 6-hue color boundaries across terminal color depths."""

    TRUECOLOR_PALETTE: List[Tuple[int, int, int]] = [
        (56, 189, 248),   # Cyan
        (52, 211, 153),   # Emerald
        (251, 191, 36),   # Amber
        (167, 139, 250),  # Violet
        (251, 113, 133),  # Rose
        (96, 165, 250),   # Blue
    ]

    PALETTE_256: List[int] = [
        75,   # Cyan
        78,   # Emerald
        214,  # Amber
        141,  # Violet
        204,  # Rose
        68,   # Blue
    ]

    def render_ansi(
        self,
        tokens: List[TokenItem],
        color_depth: str = "truecolor",
        visible_whitespace: bool = False,
    ) -> str:
        """Render tokens with cycling colors and boundary indicators."""
        if color_depth == "monochrome":
            pieces: List[str] = []
            for item in tokens:
                display_text = item.text
                if visible_whitespace and item.is_whitespace:
                    display_text = display_text.replace(" ", "·").replace("\n", "↵\n")
                pieces.append(f"[|{display_text}|]")
            return "".join(pieces)

        num_colors = (
            len(self.TRUECOLOR_PALETTE)
            if color_depth == "truecolor"
            else len(self.PALETTE_256)
        )
        rendered_tokens: List[str] = []

        for idx, item in enumerate(tokens):
            color_idx = idx % num_colors
            display_text = item.text
            if visible_whitespace and item.is_whitespace:
                display_text = display_text.replace(" ", "·").replace("\n", "↵\n")

            if color_depth == "truecolor":
                r, g, b = self.TRUECOLOR_PALETTE[color_idx]
                # Background pill styling with black text
                token_str = f"\033[48;2;{r};{g};{b}m\033[38;2;0;0;0m{display_text}\033[0m"
            else:
                # 256 color mode
                code = self.PALETTE_256[color_idx]
                token_str = f"\033[48;5;{code}m\033[38;5;0m{display_text}\033[0m"

            rendered_tokens.append(token_str)

        return "".join(rendered_tokens)
