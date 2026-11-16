import json
import httpx
import pytest

from token_inspector.cli.proxy_command import create_proxy_app
from token_inspector.storage.inspection_store import InspectionStore


@pytest.mark.anyio
async def test_cli_proxy_and_web_ui_end_to_end() -> None:
    # Arrange: Mock upstream handler simulating OpenAI provider
    def mock_upstream(request: httpx.Request) -> httpx.Response:
        body = json.loads(request.content.decode("utf-8"))
        is_stream = bool(body.get("stream", False))

        if is_stream:
            async def stream_gen():
                for word in ["Streamed", " answer", " from", " LLM"]:
                    chunk = {
                        "id": "cmpl_stream",
                        "choices": [{"index": 0, "delta": {"content": f" {word}"}}],
                    }
                    yield f"data: {json.dumps(chunk)}\n\n".encode("utf-8")
                yield b"data: [DONE]\n\n"

            return httpx.Response(200, content=stream_gen(), headers={"content-type": "text/event-stream"})
        else:
            resp_payload = {
                "id": "cmpl_nonstream",
                "choices": [
                    {
                        "index": 0,
                        "message": {"role": "assistant", "content": "Non-streamed reply."},
                    }
                ],
            }
            return httpx.Response(200, json=resp_payload)

    upstream_transport = httpx.MockTransport(mock_upstream)
    upstream_client = httpx.AsyncClient(transport=upstream_transport)

    store = InspectionStore()
    app = create_proxy_app(
        upstream_url="http://mock-upstream",
        store=store,
        upstream_client=upstream_client,
    )

    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as client:
        # Act 1: Non-streaming completion call
        non_stream_res = await client.post(
            "/v1/chat/completions",
            json={
                "model": "gpt-4o",
                "messages": [{"role": "user", "content": "Hello non-stream"}],
                "stream": False,
            },
        )
        assert non_stream_res.status_code == 200
        assert "Non-streamed reply." in non_stream_res.text
        assert "X-Token-Inspector-Prompt-Tokens" in non_stream_res.headers

        # Act 2: Streaming completion call
        stream_res = await client.post(
            "/v1/chat/completions",
            json={
                "model": "gpt-4o",
                "messages": [{"role": "user", "content": "Hello stream"}],
                "stream": True,
            },
        )
        assert stream_res.status_code == 200
        assert "text/event-stream" in stream_res.headers["content-type"]
        assert "Streamed" in stream_res.text

        # Act 3: Query Web Dashboard API history
        history_res = await client.get("/_inspector/api/history")
        assert history_res.status_code == 200
        history_data = history_res.json()

        # Assert 4: Both requests captured in store and dashboard
        assert history_data["total_captured"] == 2
        items = history_data["items"]
        assert len(items) == 2

        # Check prompt & completion tokens captured
        assert all(it["prompt_tokens"] > 0 for it in items)
        assert all(it["completion_tokens"] > 0 for it in items)
