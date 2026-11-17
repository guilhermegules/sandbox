from typing import Any, Dict, Optional
from fastapi import FastAPI, HTTPException, Query, Request, Response
from fastapi.responses import HTMLResponse, JSONResponse, StreamingResponse

from token_inspector.budget.context_budget_manager import ContextBudgetManager
from token_inspector.models.budget_schemas import ContextBudgetRequest
from token_inspector.storage.inspection_store import InspectionStore
from token_inspector.tokenizer.format_analyzer import FormatAnalyzer
from token_inspector.web.sse_broadcaster import SSEBroadcaster
from token_inspector.web.static_bundle_provider import StaticBundleProvider


class EmbeddedWebServer:
    """Embedded HTTP REST and SSE server exposing the Token Inspector UI and control plane."""

    def __init__(
        self,
        store: Optional[InspectionStore] = None,
        broadcaster: Optional[SSEBroadcaster] = None,
        bundle_provider: Optional[StaticBundleProvider] = None,
        budget_manager: Optional[ContextBudgetManager] = None,
        format_analyzer: Optional[FormatAnalyzer] = None,
        app: Optional[FastAPI] = None,
    ) -> None:
        self.store = store or InspectionStore()
        self.broadcaster = broadcaster or SSEBroadcaster()
        self.bundle_provider = bundle_provider or StaticBundleProvider()
        self.budget_manager = budget_manager or ContextBudgetManager()
        self.format_analyzer = format_analyzer or FormatAnalyzer()
        self.app = app or FastAPI(title="Token Inspector Embedded Server")

        self._setup_routes()

    def _setup_routes(self) -> None:
        @self.app.get("/_inspector")
        @self.app.get("/_inspector/")
        async def serve_dashboard(request: Request) -> Response:
            if_none_match = request.headers.get("if-none-match")
            status, headers, content = self.bundle_provider.get_asset(
                "index.html", if_none_match=if_none_match
            )
            if status == 304:
                return Response(status_code=304, headers=headers)
            elif status == 404:
                return HTMLResponse(
                    content="<h1>Token Inspector Web UI Assets Not Found</h1>", status_code=404
                )
            return Response(content=content, status_code=200, headers=headers)

        @self.app.get("/_inspector/static/{filename}")
        async def serve_static(filename: str, request: Request) -> Response:
            if_none_match = request.headers.get("if-none-match")
            status, headers, content = self.bundle_provider.get_asset(
                filename, if_none_match=if_none_match
            )
            if status == 304:
                return Response(status_code=304, headers=headers)
            elif status == 404:
                raise HTTPException(status_code=404, detail="Asset not found")
            return Response(content=content, status_code=200, headers=headers)

        @self.app.get("/_inspector/api/events")
        async def live_events() -> StreamingResponse:
            return StreamingResponse(
                self.broadcaster.subscribe(),
                media_type="text/event-stream",
                headers={
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive",
                    "X-Accel-Buffering": "no",
                },
            )

        @self.app.get("/_inspector/api/history")
        async def get_history(
            cursor: Optional[str] = Query(None),
            limit: int = Query(50, ge=1, le=200),
            model: Optional[str] = Query(None),
        ) -> Dict[str, Any]:
            result = self.store.get_history(cursor=cursor, limit=limit, model=model)
            return result.model_dump(mode="json")

        @self.app.post("/_inspector/api/budget/simulate")
        async def simulate_budget(request: ContextBudgetRequest) -> Dict[str, Any]:
            result = self.budget_manager.manage_budget(request)
            return result.model_dump(mode="json")

        @self.app.post("/_inspector/api/format/benchmark")
        async def benchmark_format(payload: Dict[str, Any]) -> Dict[str, Any]:
            data = payload.get("data")
            model = str(payload.get("model", "gpt-4o"))
            baseline = str(payload.get("baseline", "json_indented"))
            result = self.format_analyzer.benchmark_formats(
                data=data, model=model, baseline_format=baseline
            )
            return result.model_dump(mode="json")

    def get_app(self) -> FastAPI:
        return self.app
