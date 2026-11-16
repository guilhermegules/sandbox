from pathlib import Path
from typing import Any, Dict, List, Optional
import json
import sys
import click
from rich.console import Console
from rich.panel import Panel
from rich.syntax import Syntax

from token_inspector.budget.context_budget_manager import ContextBudgetManager
from token_inspector.models.budget_schemas import (
    ContextBudgetRequest,
    ContextMessage,
    PriorityTier,
)


@click.command(name="budget")
@click.option("--file", "-f", type=click.Path(exists=True, path_type=Path), help="Path to context JSON file")
@click.option("--max-tokens", "-t", type=int, required=True, help="Maximum allowed token ceiling")
@click.option("--model", "-m", default="gpt-4o", help="Target model (default: gpt-4o)")
@click.option("--allow-user-truncation", is_flag=True, default=False, help="Allow P2 user query truncation")
def budget_command(
    file: Optional[Path],
    max_tokens: int,
    model: str,
    allow_user_truncation: bool,
) -> None:
    """Simulate syntax-aware context truncation and inspect token budget savings."""
    console = Console(width=120)

    raw_text = ""
    if file:
        raw_text = file.read_text(encoding="utf-8")
    elif not sys.stdin.isatty():
        raw_text = sys.stdin.read()
    else:
        console.print("[red]Error: Provide a context JSON file via --file or piped through stdin.[/red]")
        sys.exit(1)

    parsed_input: Any = None
    try:
        parsed_input = json.loads(raw_text)
    except json.JSONDecodeError:
        parsed_input = [{"role": "user", "content": raw_text, "priority": PriorityTier.USER_QUERY}]

    messages: List[ContextMessage] = []
    if isinstance(parsed_input, list):
        for item in parsed_input:
            if isinstance(item, dict):
                role = str(item.get("role", "user"))
                content = item.get("content", "")
                p_val = item.get("priority", PriorityTier.CHAT_HISTORY)
                try:
                    priority = PriorityTier(int(p_val))
                except Exception:
                    priority = PriorityTier.CHAT_HISTORY
                name = item.get("name")
                messages.append(ContextMessage(role=role, content=content, priority=priority, name=name))
            else:
                messages.append(ContextMessage(role="user", content=str(item)))
    elif isinstance(parsed_input, dict):
        messages.append(ContextMessage(role="user", content=json.dumps(parsed_input)))

    request = ContextBudgetRequest(
        messages=messages,
        max_tokens=max_tokens,
        model=model,
        allow_user_truncation=allow_user_truncation,
        ensure_json_syntax=True,
        auto_close_markdown=True,
    )

    manager = ContextBudgetManager()
    result = manager.manage_budget(request)

    # Summary Panel
    diff = result.diff
    diff_text = (
        f"[bold]Target Ceiling:[/bold] {max_tokens} tokens\n"
        f"[bold]Original Tokens:[/bold] {diff.original_tokens}\n"
        f"[bold]Truncated Tokens:[/bold] {diff.truncated_tokens}\n"
        f"[bold]Tokens Saved:[/bold] [green]{diff.tokens_saved}[/green] "
        f"({(diff.tokens_saved / diff.original_tokens * 100.0) if diff.original_tokens else 0:.1f}% reduction)\n"
        f"[bold]Pruned Message Indices:[/bold] {diff.pruned_message_indices}\n"
        f"[bold]Budget Satisfied:[/bold] {'[green]Yes[/green]' if result.is_budget_satisfied else '[red]No[/red]'}\n"
        f"[bold]JSON AST Validated:[/bold] {result.json_ast_validated}\n"
        f"[bold]Markdown Repaired:[/bold] {result.markdown_repaired}"
    )
    console.print(Panel(diff_text, title="✂ Context Budget Truncation Diff", border_style="cyan"))

    # Truncated messages JSON
    truncated_json = json.dumps(result.messages, indent=2)
    syntax = Syntax(truncated_json, "json", theme="monokai", line_numbers=False)
    console.print("\n[bold]Truncated Context Payload:[/bold]")
    console.print(syntax)
