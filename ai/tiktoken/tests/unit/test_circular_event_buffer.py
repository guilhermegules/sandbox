from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import pytest

from token_inspector.models.inspection_record import InspectionRecord
from token_inspector.storage.circular_event_buffer import CircularEventBuffer


def make_record(rec_id: str, prompt_tokens: int) -> InspectionRecord:
    return InspectionRecord(
        id=rec_id,
        timestamp=datetime.now(timezone.utc),
        method="POST",
        path="/v1/chat/completions",
        model="gpt-4o",
        status_code=200,
        duration_ms=50.0,
        prompt_tokens=prompt_tokens,
        completion_tokens=10,
        total_tokens=prompt_tokens + 10,
        context_ceiling=128000,
        saturation_pct=0.01,
        estimated_cost_usd=0.0001,
    )


def test_circular_event_buffer_eviction_and_order() -> None:
    # Arrange: capacity 10
    buffer: CircularEventBuffer[InspectionRecord] = CircularEventBuffer(capacity=10)

    # Act: sequentially append 15 records (0 to 14)
    for i in range(15):
        buffer.append(make_record(f"req_{i:02d}", prompt_tokens=i))

    # Assert
    assert len(buffer) == 10
    items = buffer.get_all()
    assert len(items) == 10
    # Oldest 5 (0, 1, 2, 3, 4) evicted; items remaining are 5 through 14
    ids = [item.id for item in items]
    assert ids == [f"req_{i:02d}" for i in range(5, 15)]


def test_circular_event_buffer_concurrent_appends() -> None:
    # Arrange: capacity 10
    buffer: CircularEventBuffer[InspectionRecord] = CircularEventBuffer(capacity=10)

    # Act: append 50 items concurrently across threads
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = [
            executor.submit(buffer.append, make_record(f"req_{i}", prompt_tokens=i))
            for i in range(50)
        ]
        for f in futures:
            f.result()

    # Assert
    assert len(buffer) == 10
    items = buffer.get_all()
    assert len(items) == 10
