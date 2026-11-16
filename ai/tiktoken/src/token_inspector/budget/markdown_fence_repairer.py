import re


class MarkdownFenceRepairer:
    """Detects truncated markdown fences and automatically repairs them with closing fences."""

    FENCE_PATTERN = re.compile(r"^ {0,3}(`{3,}|~{3,})", re.MULTILINE)

    def is_unclosed(self, text: str) -> bool:
        """Check if text ends inside an unclosed code block."""
        matches = self.FENCE_PATTERN.findall(text)
        return len(matches) % 2 != 0

    def repair(self, text: str, indicator: str = "<!-- [truncated by context budget] -->") -> str:
        """Repair unclosed fences in text by appending an indicator and closing fence."""
        if not self.is_unclosed(text):
            return text

        # If unclosed, determine which fence opened it (usually ```)
        matches = self.FENCE_PATTERN.findall(text)
        fence_type = matches[-1] if matches else "```"

        repaired = text.rstrip() + f"\n{indicator}\n{fence_type}\n"
        return repaired
