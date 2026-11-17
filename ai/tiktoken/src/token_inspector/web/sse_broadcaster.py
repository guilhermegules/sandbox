from typing import Any, AsyncIterator, Dict, Set, Union
import asyncio
import json

from token_inspector.models.event_schemas import InspectorSSEEvent


class SSEBroadcaster:
    """Manages active browser SSE client subscriptions and multicasts inspection events."""

    def __init__(self) -> None:
        self._subscribers: Set[asyncio.Queue[str]] = set()
        self._lock = asyncio.Lock()

    @property
    def subscriber_count(self) -> int:
        return len(self._subscribers)

    def add_subscriber(self, queue: asyncio.Queue[str]) -> None:
        self._subscribers.add(queue)

    def remove_subscriber(self, queue: asyncio.Queue[str]) -> None:
        self._subscribers.discard(queue)

    @staticmethod
    def format_event(event: Union[InspectorSSEEvent, Dict[str, Any]]) -> str:
        if isinstance(event, InspectorSSEEvent):
            data_str = event.model_dump_json()
            return f"event: {event.event_type}\ndata: {data_str}\n\n"
        elif isinstance(event, dict):
            event_type = event.get("event_type", "message")
            return f"event: {event_type}\ndata: {json.dumps(event)}\n\n"
        return f"data: {str(event)}\n\n"

    async def broadcast(self, event: Union[InspectorSSEEvent, Dict[str, Any]]) -> None:
        """Broadcast an event payload to all active subscribers."""
        msg = self.format_event(event)
        # Snapshot subscribers to safely iterate
        subscribers = list(self._subscribers)
        for q in subscribers:
            try:
                q.put_nowait(msg)
            except asyncio.QueueFull:
                self.remove_subscriber(q)
            except Exception:
                pass

    def broadcast_sync(self, event: Union[InspectorSSEEvent, Dict[str, Any]]) -> None:
        """Synchronous helper that schedules broadcast on active event loop."""
        try:
            loop = asyncio.get_running_loop()
            loop.create_task(self.broadcast(event))
        except RuntimeError:
            pass

    async def subscribe(self) -> AsyncIterator[str]:
        """Async generator yielding SSE messages for a connected HTTP client."""
        queue: asyncio.Queue[str] = asyncio.Queue(maxsize=100)
        self.add_subscriber(queue)
        try:
            # Send initial connection comment
            yield ": connected\n\n"
            while True:
                msg = await queue.get()
                yield msg
        finally:
            self.remove_subscriber(queue)
