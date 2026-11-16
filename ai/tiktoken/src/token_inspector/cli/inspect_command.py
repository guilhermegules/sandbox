from pathlib import Path
from typing import Optional
import sys
import click
from rich.console import Console
from rich.panel import Panel
from rich.table import Table

from token_inspector.tokenizer.bpe_encoder import BPEEncoder
from token_inspector.tokenizer.boundary_visualizer import BoundaryVisualizer
from token_inspector.tokenizer.cost_estimator import CostEstimator
from token_inspector.tokenizer.model_registry import ModelRegistry


@click.command(name="inspect")
@click.argument("text", required=False)
@click.option("--file", "-f", type=click.Path(exists=True, path_type=Path), help="File path to inspect")
@click.option("--model", "-m", default="gpt-4o", help="Target model (default: gpt-4o)")
@click.option("--color", default="truecolor", type=click.Choice(["truecolor", "256", "monochrome"]), help="Color depth")
@click.option("--details/--no-details", default=True, help="Display token breakdown table")
def inspect_command(
    text: Optional[str],
    file: Optional[Path],
    model: str,
    color: str,
    details: bool,
) -> None:
    """Inspect text prompt token boundaries, character metrics, and estimated costs."""
    console = Console()

    # Determine input source
    target_text = ""
    if text:
        target_text = text
    elif file:
        target_text = file.read_text(encoding="utf-8")
    elif not sys.stdin.isatty():
        target_text = sys.stdin.read()
    else:
        console.print("[red]Error: Please provide text as an argument, via --file, or piped from stdin.[/red]")
        sys.exit(1)

    registry = ModelRegistry()
    cost_estimator = CostEstimator()
    visualizer = BoundaryVisualizer()

    encoding_name = registry.get_encoding_name(model)
    encoder = BPEEncoder(encoding_name=encoding_name)
    items = encoder.encode_to_items(target_text)

    token_count = len(items)
    char_count = len(target_text)
    cost = cost_estimator.calculate_cost(prompt_tokens=token_count, completion_tokens=0, model=model)
    ceiling = registry.get_context_ceiling(model)
    saturation = round((token_count / ceiling) * 100.0, 4) if ceiling > 0 else 0.0

    # Summary Panel
    summary_text = (
        f"[bold]Model:[/bold] {model} ({encoding_name})\n"
        f"[bold]Token Count:[/bold] {token_count}\n"
        f"[bold]Character Count:[/bold] {char_count}\n"
        f"[bold]Estimated Prompt Cost:[/bold] ${cost:.6f} USD\n"
        f"[bold]Context Ceiling:[/bold] {ceiling} tokens ({saturation:.2f}% saturated)"
    )
    console.print(Panel(summary_text, title="🔍 Token Inspector Summary", border_style="blue"))

    # Boundary Visualizer
    rendered_boundaries = visualizer.render_ansi(items, color_depth=color)
    console.print("\n[bold]Token Boundaries:[/bold]")
    console.print(rendered_boundaries)

    # Detailed Token Breakdown Table
    if details:
        table = Table(title=f"Detailed Token Breakdown ({model})", border_style="dim")
        table.add_column("Idx", justify="right", style="cyan", no_wrap=True)
        table.add_column("Token ID", justify="right", style="green")
        table.add_column("Text", style="bold")
        table.add_column("Bytes", justify="right", style="magenta")
        table.add_column("Hex Bytes", style="dim")

        for item in items:
            display_text = item.text.replace("\n", "\\n").replace("\t", "\\t")
            table.add_row(
                str(item.index),
                str(item.token_id),
                repr(display_text)[1:-1],
                str(item.byte_length),
                item.raw_bytes,
            )

        console.print("\n")
        console.print(table)
