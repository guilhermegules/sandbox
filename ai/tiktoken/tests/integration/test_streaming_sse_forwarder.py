from typing import AsyncIterator, List
import asyncio
import json
import time
import pytest

from token_inspector.models.inspection_record import InspectionRecord
from token_inspector.proxy.request_interceptor import InterceptedRequest
from token_inspector.proxy.streaming_forwarder import StreamingForwarder
from token_inspector.storage.inspection_store import InspectionStore


async def generate_mock_sse_chunks() -> AsyncIterator[bytes]:
    words = ["The", " quick", " brown", " fox", " jumps", " over", " the", " lazy", " dog", "."]
    for i, word in enumerate(words):
        chunk_obj = {
            "id": "chatcmpl_test",
            "choices": [{"index": 0, "delta": {"content": word}}],
        }
        chunk_line = f"data: {json.dumps(chunk_obj)}\n\n".encode("utf-8")
        yield chunk_line
        await asyncio.sleep(0.001)  # 1ms delay

    yield b"data: [DONE]\n\n"


@pytest.mark.anyio
async def test_streaming_sse_forwarder_zero_latency_and_accumulation() -> None:
    # Arrange
    store = InspectionStore()
    forwarder = StreamingForwarder()
    intercepted = InterceptedRequest(
        request_id="req_stream_test",
        model="gpt-4o",
        prompt_tokens=15,
        estimated_cost_usd=0.00003,
        context_ceiling=128000,
        saturation_pct=0.01,
        is_streaming=True,
    )

    received_chunks: List[bytes] = []
    start_time = time.perf_counter()

    # Act
    async for chunk in forwarder.stream_response(
        upstream_stream=generate_mock_sse_chunks(),
        intercepted=intercepted,
        store=store,
    ):
        received_chunks.append(chunk)

    total_duration = time.perf_counter() - start_time

    # Assert
    # 1. Received all 10 chunks + [DONE]
    assert len(received_chunks) == 11
    assert b"[DONE]" in received_chunks[-1]

    # 2. Accumulated record was saved in store
    saved_record = store.get_record("req_stream_test")
    assert saved_record is not None
    assert saved_record.id == "req_stream_test"
    assert saved_record.is_streaming is True
    assert saved_record.completion_tokens == 10
    assert saved_record.total_tokens == 25  # 15 prompt + 10 completion
    assert saved_record.ttfb_ms is not None
    assert len(saved_record.completion_tokens_detail) == 10
