import asyncio
import pytest

from token_inspector.models.event_schemas import InspectorSSEEvent
from token_inspector.proxy.disconnect_handler import DisconnectHandler
from token_inspector.proxy.request_interceptor import InterceptedRequest
from token_inspector.storage.inspection_store import InspectionStore


class MockBroadcaster:
    def __init__(self) -> None:
        self.events: list[InspectorSSEEvent] = []

    async def broadcast(self, event: InspectorSSEEvent) -> None:
        self.events.append(event)


class MockUpstreamResponse:
    def __init__(self) -> None:
        self.closed = False

    async def aclose(self) -> None:
        self.closed = True


@pytest.mark.anyio
async def test_disconnect_handler_catches_cancellation_and_aborts_upstream() -> None:
    # Arrange
    store = InspectionStore()
    broadcaster = MockBroadcaster()
    upstream = MockUpstreamResponse()
    handler = DisconnectHandler()

    intercepted = InterceptedRequest(
        request_id="req_abort_001",
        model="gpt-4o",
        prompt_tokens=10,
        estimated_cost_usd=0.00002,
        context_ceiling=128000,
        saturation_pct=0.008,
        is_streaming=True,
    )

    # Act
    with pytest.raises(asyncio.CancelledError):
        async with handler.guard(
            request_id="req_abort_001",
            upstream_response=upstream,
            intercepted=intercepted,
            partial_text_fn=lambda: "Partial generated sentence before disconnect",
            store=store,
            broadcaster=broadcaster,
        ):
            # Simulate cancellation raised inside the stream piping block
            raise asyncio.CancelledError()

    # Assert
    # 1. Upstream response was closed immediately
    assert upstream.closed is True

    # 2. Broadcaster received 'stream_aborted' event
    assert len(broadcaster.events) == 1
    assert broadcaster.events[0].event_type == "stream_aborted"
    assert broadcaster.events[0].request_id == "req_abort_001"
    assert "partial_tokens" in broadcaster.events[0].payload
