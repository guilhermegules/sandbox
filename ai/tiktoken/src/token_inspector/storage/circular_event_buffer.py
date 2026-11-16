from collections import deque
from threading import Lock
from typing import Generic, List, Optional, TypeVar

T = TypeVar("T")


class CircularEventBuffer(Generic[T]):
    """Thread-safe bounded in-memory circular ring buffer with FIFO eviction."""

    def __init__(self, capacity: int = 1000) -> None:
        if capacity <= 0:
            raise ValueError("Capacity must be positive integer")
        self._capacity = capacity
        self._buffer: deque[T] = deque(maxlen=capacity)
        self._lock = Lock()

    @property
    def capacity(self) -> int:
        return self._capacity

    def append(self, item: T) -> None:
        """Append an item to the buffer, automatically evicting oldest item if full."""
        with self._lock:
            self._buffer.append(item)

    def get_all(self) -> List[T]:
        """Return a snapshot list of all items currently in the buffer (oldest to newest)."""
        with self._lock:
            return list(self._buffer)

    def clear(self) -> None:
        """Clear all items from the buffer."""
        with self._lock:
            self._buffer.clear()

    def __len__(self) -> int:
        with self._lock:
            return len(self._buffer)
