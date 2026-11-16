from typing import List, Optional
import asyncio
import sys
import click
from rich.console import Console
from rich.panel import Panel
from rich.table import Table

from token_inspector.models.sampling_schemas import SamplingMatrixConfig
from token_inspector.sampling.matrix_runner import MatrixRunner


@click.command(name="compare")
@click.option("--prompt", "-p", required=True, help="Prompt text to evaluate across sampling parameters")
@click.option("--temperatures", "-t", default="0.0,0.7", help="Comma-separated sampling temperatures (e.g. 0.0,0.7)")
@click.option("--top-ps", default="1.0", help="Comma-separated top_p values (e.g. 1.0)")
@click.option("--model", "-m", default="gpt-4o", help="Target model (default: gpt-4o)")
@click.option("--max-tokens", default=64, type=int, help="Max output generation tokens")
@click.option("--base-url", default="https://api.openai.com/v1", help="Upstream API base URL")
@click.option("--api-key", default=None, help="OpenAI API key")
def compare_command(
    prompt: str,
    temperatures: str,
    top_ps: str,
    model: str,
    max_tokens: int,
    base_url: str,
    api_key: Optional[str],
) -> None:
    """Compare sampling matrix, sequence perplexity, confidence tiers, and semantic divergence."""
    console = Console(width=120)

    try:
        temp_list = [float(t.strip()) for t in temperatures.split(",") if t.strip()]
        top_p_list = [float(p.strip()) for p in top_ps.split(",") if p.strip()]
    except ValueError as err:
        console.print(f"[red]Error parsing numeric parameters:[/red] {err}")
        sys.exit(1)

    config = SamplingMatrixConfig(
        temperatures=temp_list,
        top_ps=top_p_list,
        max_tokens=max_tokens,
        model=model,
    )

    runner = MatrixRunner(base_url=base_url, api_key=api_key)
    try:
        report = asyncio.run(runner.run_matrix(prompt, config))
    except Exception as err:
        console.print(f"[bold red]Sampling Matrix Execution Error:[/bold red] {err}")
        sys.exit(1)

    # Trials Comparison Table
    table = Table(title=f"Sampling Parameter Matrix ({model})", border_style="cyan")
    table.add_column("Trial ID", style="bold")
    table.add_column("Temp", justify="right")
    table.add_column("Top P", justify="right")
    table.add_column("Output Text", style="dim")
    table.add_column("Perplexity", justify="right", style="magenta")
    table.add_column("Avg Confidence", justify="right", style="green")
    table.add_column("Divergence Idx", justify="right", style="yellow")

    for trial in report.trials:
        div_str = str(trial.divergence_token_index) if trial.divergence_token_index is not None else "Baseline"
        snippet = trial.output_text.replace("\n", " ")
        if len(snippet) > 40:
            snippet = snippet[:37] + "..."
        table.add_row(
            trial.trial_id,
            str(trial.temperature),
            str(trial.top_p),
            snippet,
            f"{trial.perplexity:.3f}",
            f"{trial.average_confidence_pct:.1f}%",
            div_str,
        )

    console.print(table)

    # Divergence Points
    if report.divergence_points:
        console.print("\n[bold yellow]Semantic Branching & Divergence Points:[/bold yellow]")
        for pt in report.divergence_points:
            panel_content = (
                f"[bold]Token Position:[/bold] {pt.token_index}\n"
                f"[bold]Baseline Choice:[/bold] [green]'{pt.baseline_token}'[/green]\n"
                f"[bold]Divergent Choice:[/bold] [red]'{pt.divergent_token}'[/red]\n"
                f"[bold]Reason:[/bold] {pt.divergence_reason}"
            )
            console.print(Panel(panel_content, border_style="yellow"))
    else:
        console.print("\n[green]No token divergence observed across evaluated trials.[/green]")
