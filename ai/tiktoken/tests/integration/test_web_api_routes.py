from pathlib import Path
import httpx
import pytest

from token_inspector.budget.context_budget_manager import ContextBudgetManager
from token_inspector.models.budget_schemas import ContextBudgetRequest, ContextMessage, PriorityTier
from token_inspector.storage.inspection_store import InspectionStore
from token_inspector.tokenizer.format_analyzer import FormatAnalyzer
from token_inspector.web.embedded_server import EmbeddedWebServer
from token_inspector.web.sse_broadcaster import SSEBroadcaster
from token_inspector.web.static_bundle_provider import StaticBundleProvider


@pytest.fixture
def test_static_dir(tmp_path: Path) -> Path:
    static = tmp_path / "static"
    static.mkdir()
    (static / "index.html").write_text("<!DOCTYPE html><html><body>Token Inspector</body></html>")
    (static / "app.css").write_text("body { margin: 0; }")
    (static / "app.js").write_text("console.log('init');")
    return static


@pytest.mark.anyio
async def test_web_api_routes(test_static_dir: Path) -> None:
    # Arrange
    store = InspectionStore()
    broadcaster = SSEBroadcaster()
    bundle_provider = StaticBundleProvider(static_dir=test_static_dir)
    budget_manager = ContextBudgetManager()
    format_analyzer = FormatAnalyzer()

    server = EmbeddedWebServer(
        store=store,
        broadcaster=broadcaster,
        bundle_provider=bundle_provider,
        budget_manager=budget_manager,
        format_analyzer=format_analyzer,
    )
    app = server.get_app()

    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        # Act 1: GET /_inspector serves index.html
        res_ui = await client.get("/_inspector")
        assert res_ui.status_code == 200
        assert "Token Inspector" in res_ui.text

        # Act 2: GET /_inspector/static/app.css
        res_css = await client.get("/_inspector/static/app.css")
        assert res_css.status_code == 200
        assert "text/css" in res_css.headers["Content-Type"]

        # Act 3: GET /_inspector/api/history
        res_hist = await client.get("/_inspector/api/history?limit=10")
        assert res_hist.status_code == 200
        data = res_hist.json()
        assert "items" in data
        assert "total_captured" in data

        # Act 4: POST /_inspector/api/budget/simulate
        budget_req = {
            "messages": [
                {"role": "system", "content": "Be concise.", "priority": 1},
                {"role": "user", "content": "What is AI?", "priority": 2},
            ],
            "max_tokens": 100,
            "model": "gpt-4o",
        }
        res_budget = await client.post("/_inspector/api/budget/simulate", json=budget_req)
        assert res_budget.status_code == 200
        budget_data = res_budget.json()
        assert budget_data["is_budget_satisfied"] is True
        assert "diff" in budget_data

        # Act 5: POST /_inspector/api/format/benchmark
        bench_req = {
            "data": [{"id": 1, "name": "alice"}, {"id": 2, "name": "bob"}],
            "model": "gpt-4o",
        }
        res_bench = await client.post("/_inspector/api/format/benchmark", json=bench_req)
        assert res_bench.status_code == 200
        bench_data = res_bench.json()
        assert "winner_format" in bench_data
        assert "formats" in bench_data
