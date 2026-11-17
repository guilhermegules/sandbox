from typing import Any, Dict
import json
import httpx
import pytest

from token_inspector.proxy.reverse_proxy_server import ReverseProxyServer
from token_inspector.storage.inspection_store import InspectionStore


@pytest.mark.anyio
async def test_reverse_proxy_non_streaming_interception() -> None:
    # Arrange: mock upstream provider
    def upstream_handler(request: httpx.Request) -> httpx.Response:
        data = json.loads(request.content.decode("utf-8"))
        model = data.get("model", "gpt-4o")
        res = {
            "id": "chatcmpl_mock_99",
            "model": model,
            "choices": [
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": "Hello! I am mock LLM."},
                    "finish_reason": "stop",
                }
            ],
            "usage": {"prompt_tokens": 15, "completion_tokens": 8, "total_tokens": 23},
        }
        return httpx.Response(200, json=res)

    mock_transport = httpx.MockTransport(upstream_handler)
    mock_client = httpx.AsyncClient(transport=mock_transport)

    store = InspectionStore()
    proxy = ReverseProxyServer(
        upstream_url="http://mock-upstream",
        store=store,
        client=mock_client,
    )
    asgi_app = proxy.get_app()

    # Act
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=asgi_app), base_url="http://test") as client:
        payload = {
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "You are helpful."},
                {"role": "user", "content": "Hello LLM"},
            ],
            "stream": False,
        }
        headers = {"Authorization": "Bearer sk-secret-live-api-key-12345"}
        response = await client.post("/v1/chat/completions", json=payload, headers=headers)

    # Assert
    assert response.status_code == 200
    resp_json = response.json()
    assert resp_json["id"] == "chatcmpl_mock_99"
    assert resp_json["choices"][0]["message"]["content"] == "Hello! I am mock LLM."

    # Intercepted headers present in response
    assert "X-Token-Inspector-Prompt-Tokens" in response.headers
    assert "X-Token-Inspector-Request-ID" in response.headers
    assert "X-Token-Inspector-Cost-USD" in response.headers
    assert "X-Token-Inspector-Saturation-Pct" in response.headers

    # Inspection record was saved to store with sanitized headers
    history = store.get_history(limit=10)
    assert len(history.items) == 1
    rec = history.items[0]
    assert rec.model == "gpt-4o"
    assert rec.total_tokens > 0
    assert rec.completion_tokens > 0
    assert "sk-secret-live-api-key-12345" not in rec.raw_request_headers.get("authorization", "")
    assert rec.raw_request_headers.get("authorization") == "Bearer [REDACTED]"
