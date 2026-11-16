import pytest
from token_inspector.budget.markdown_fence_repairer import MarkdownFenceRepairer


def test_markdown_fence_repairer_repairs_unclosed_codeblock() -> None:
    # Arrange
    truncated_markdown = "```python\ndef process():\n    x = 1"
    repairer = MarkdownFenceRepairer()

    # Act
    repaired = repairer.repair(truncated_markdown)

    # Assert
    assert "```\n" in repaired or repaired.endswith("```")
    assert "<!-- [truncated by context budget] -->" in repaired
    # Verify the code block is now balanced
    assert repaired.count("```") % 2 == 0


def test_markdown_fence_repairer_leaves_balanced_markdown_intact() -> None:
    # Arrange
    complete_markdown = "Here is some text:\n```python\nprint('hello')\n```\nDone."
    repairer = MarkdownFenceRepairer()

    # Act
    repaired = repairer.repair(complete_markdown)

    # Assert
    assert repaired == complete_markdown
    assert repaired.count("```") % 2 == 0
