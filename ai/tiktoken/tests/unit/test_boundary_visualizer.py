import pytest

from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.boundary_visualizer import BoundaryVisualizer


def test_boundary_visualizer_truecolor_rendering() -> None:
    # Arrange
    encoder = BPEEncoder(encoding_name="cl100k_base")
    sample_text = "Analyzing token boundaries"
    tokens = encoder.encode_to_items(sample_text)
    visualizer = BoundaryVisualizer()

    # Act
    output = visualizer.render_ansi(tokens, color_depth="truecolor")

    # Assert
    assert "\033[0m" in output  # Closed styling tags
    assert "\033[48;2;" in output or "\033[38;2;" in output  # Truecolor ANSI codes
    # Verify cycling hue index: multiple distinct ANSI color sequences
    assert output.count("\033[0m") == len(tokens)


def test_boundary_visualizer_256_color_depth() -> None:
    # Arrange
    encoder = BPEEncoder(encoding_name="cl100k_base")
    tokens = encoder.encode_to_items("Hello world")
    visualizer = BoundaryVisualizer()

    # Act
    output = visualizer.render_ansi(tokens, color_depth="256")

    # Assert
    assert "\033[0m" in output
    assert "\033[48;5;" in output or "\033[38;5;" in output


def test_boundary_visualizer_monochrome_depth() -> None:
    # Arrange
    encoder = BPEEncoder(encoding_name="cl100k_base")
    tokens = encoder.encode_to_items("Hello world")
    visualizer = BoundaryVisualizer()

    # Act
    output = visualizer.render_ansi(tokens, color_depth="monochrome")

    # Assert
    assert "[|" in output
    assert "|]" in output
    assert "\033[" not in output
