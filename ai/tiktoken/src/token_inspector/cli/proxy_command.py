from typing import Optional
import click
import httpx
from fastapi import FastAPI
from rich.console import Console
from rich.panel import Panel

from token_inspector.budget.context_budget_manager import ContextBudgetManager
from token_inspector.proxy.reverse_proxy_server import ReverseProxyServer
from token_inspector.storage.inspection_store import InspectionStore
from token_inspector.tokenizer.format_analyzer import FormatAnalyzer
from token_inspector.web.embedded_server import EmbeddedWebServer
from token_inspector.web.sse_broadcaster import SSEBroadcaster
from token_inspector.web.static_bundle_provider import StaticBundleProvider


def create_proxy_app(
    upstream_url: str = "https://api.openai.com",
    store: Optional[InspectionStore] = None,
    broadcaster: Optional[SSEBroadcaster] = None,
    upstream_client: Optional[httpx.AsyncClient] = None,
) -> FastAPI:
    """Create unified ASGI application merging Reverse Proxy and Embedded Web Dashboard."""
    shared_store = store or InspectionStore()
    shared_broadcaster = broadcaster or SSEBroadcaster()
    bundle_provider = StaticBundleProvider()
    budget_manager = ContextBudgetManager()
    format_analyzer = FormatAnalyzer()

    app = FastAPI(title="Token Inspector Combined Server")

    # 1. Mount control plane & web assets under /_inspector
    EmbeddedWebServer(
        store=shared_store,
        broadcaster=shared_broadcaster,
        bundle_provider=bundle_provider,
        budget_manager=budget_manager,
        format_analyzer=format_analyzer,
        app=app,
    )

    # 2. Mount transparent reverse proxy under /v1/...
    proxy = ReverseProxyServer(
        upstream_url=upstream_url,
        store=shared_store,
        broadcaster=shared_broadcaster,
        client=upstream_client,
    )
    app.include_router(proxy.app.router)

    return app


@click.command(name="proxy")
@click.option("--port", "-p", default=8080, type=int, help="Port to bind the proxy server to (default: 8080)")
@click.option("--host", "-h", default="127.0.0.1", help="Host address to bind to (default: 127.0.0.1)")
@click.option("--upstream", "-u", default="https://api.openai.com", help="Upstream LLM provider base URL")
def proxy_command(
    port: int,
    host: str,
    upstream: str,
) -> None:
    """Run transparent LLM reverse proxy and serve embedded zero-CDN web inspector dashboard."""
    import uvicorn

    console = Console()
    banner = (
        f"[bold cyan]🔍 Token Inspector Reverse Proxy Active[/bold cyan]\n\n"
        f"[bold]Upstream Provider:[/bold] {upstream}\n"
        f"[bold]Client API Base URL:[/bold] [green]http://{host}:{port}/v1[/green]\n"
        f"[bold]Web Inspector Dashboard:[/bold] [yellow]http://{host}:{port}/_inspector[/yellow]\n\n"
        f"[dim]Configure OpenAI SDK: client = OpenAI(base_url='http://{host}:{port}/v1')[/dim]"
    )
    console.print(Panel(banner, border_style="cyan"))

    app = create_proxy_app(upstream_url=upstream)
    uvicorn.run(app, host=host, port=port, log_level="info")
