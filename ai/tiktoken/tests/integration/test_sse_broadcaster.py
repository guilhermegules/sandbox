import asyncio
import json
import pytest

from token_inspector.models.event_schemas import InspectorSSEEvent
from token_inspector.web.sse_broadcaster import SSEBroadcaster


@pytest.mark.anyio
async def test_sse_broadcaster_multi_subscriber_distribution() -> None:
    # Arrange
    broadcaster = SSEBroadcaster()
    q1 = asyncio.Queue()
    q2 = asyncio.Queue()
    q3 = asyncio.Queue()

    broadcaster.add_subscriber(q1)
    broadcaster.add_subscriber(q2)
    broadcaster.add_subscriber(q3)

    assert broadcaster.subscriber_count == 3

    event = InspectorSSEEvent(
        event_type="request_captured",
        request_id="req_sub_01",
        payload={"model": "gpt-4o", "tokens": 42},
        timestamp="2026-11-16T12:00:00Z",
    )

    # Act 1: broadcast to all 3
    await broadcaster.broadcast(event)

    # Assert 1: all 3 queues receive formatted SSE message
    m1 = await q1.get()
    m2 = await q2.get()
    m3 = await q3.get()

    assert m1.startswith("data: ") or "event: request_captured" in m1
    assert "req_sub_01" in m1
    assert m1 == m2 == m3

    # Act 2: remove q2 (client disconnect)
    broadcaster.remove_subscriber(q2)
    assert broadcaster.subscriber_count == 2

    # Act 3: broadcast second event
    event2 = InspectorSSEEvent(
        event_type="stream_completed",
        request_id="req_sub_02",
        payload={"status": "ok"},
        timestamp="2026-11-16T12:01:00Z",
    )
    await broadcaster.broadcast(event2)

    # Assert 2: q1 and q3 receive event2; q2 remains empty
    m1_second = await q1.get()
    m3_second = await q3.get()
    assert "req_sub_02" in m1_second
    assert "req_sub_02" in m3_second
    assert q2.empty()
