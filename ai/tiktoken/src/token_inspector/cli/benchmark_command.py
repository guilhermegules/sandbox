from pathlib import Path
from typing import Optional
import json
import sys
import click
from rich.console import Console
from rich.panel import Panel
from rich.table import Table

from token_inspector.tokenizer.format_analyzer import FormatAnalyzer


@click.command(name="benchmark")
@click.option("--file", "-f", type=click.Path(exists=True, path_type=Path), help="Path to JSON data file")
@click.option("--model", "-m", default="gpt-4o", help="Target model (default: gpt-4o)")
@click.option("--baseline", "-b", default="json_indented", help="Baseline comparison format")
def benchmark_command(
    file: Optional[Path],
    model: str,
    baseline: str,
) -> None:
    """Benchmark data serialization efficiency across JSON, YAML, and Markdown."""
    console = Console(width=120)

    raw_text = ""
    if file:
        raw_text = file.read_text(encoding="utf-8")
    elif not sys.stdin.isatty():
        raw_text = sys.stdin.read()
    else:
        console.print("[red]Error: Provide a JSON file via --file or piped through stdin.[/red]")
        sys.exit(1)

    try:
        data = json.loads(raw_text)
    except json.JSONDecodeError as err:
        console.print(f"[red]Error parsing JSON input:[/red] {err}")
        sys.exit(1)

    analyzer = FormatAnalyzer()
    report = analyzer.benchmark_formats(data, model=model, baseline_format=baseline)

    # Format Comparison Table
    table = Table(title=f"Serialization Format Benchmark ({model})", border_style="cyan")
    table.add_column("Format", style="bold")
    table.add_column("Tokens", justify="right", style="green")
    table.add_column("Bytes", justify="right", style="magenta")
    table.add_column("Chars", justify="right")
    table.add_column("Tk/Byte Ratio", justify="right", style="dim")
    table.add_column("Token Savings", justify="right", style="bold yellow")
    table.add_column("Cost / 1M Calls", justify="right", style="blue")

    for f in report.formats:
        savings_text = f"{f.token_savings_pct:+.1f}%" if f.format_name != baseline else "0.0% (base)"
        is_winner = f.format_name == report.winner_format
        prefix = "★ " if is_winner else ""
        table.add_row(
            f"{prefix}{f.format_name}",
            str(f.token_count),
            str(f.byte_count),
            str(f.char_count),
            f"{f.token_to_byte_ratio:.3f}",
            savings_text,
            f"${f.cost_per_million_calls_usd:.2f}",
        )

    console.print(table)

    # Key Bloat Table
    if report.key_bloat:
        bloat_table = Table(title="Repeated Key Token Bloat Analysis", border_style="yellow")
        bloat_table.add_column("Key Name", style="bold")
        bloat_table.add_column("Occurrences", justify="right")
        bloat_table.add_column("Tokens / Key", justify="right")
        bloat_table.add_column("Total Tokens", justify="right", style="red")
        bloat_table.add_column("Overhead %", justify="right", style="yellow")

        for item in report.key_bloat[:8]:  # Show top 8 repeated keys
            bloat_table.add_row(
                item.key_name,
                str(item.occurrences),
                str(item.tokens_per_key),
                str(item.total_token_overhead),
                f"{item.overhead_percentage:.1f}%",
            )
        console.print("\n")
        console.print(bloat_table)

    # Recommendation Panel
    rec_panel = Panel(
        f"[bold green]Winner: {report.winner_format}[/bold green]\n{report.recommendation}",
        title="🏆 Optimization Recommendation",
        border_style="green",
    )
    console.print("\n")
    console.print(rec_panel)
