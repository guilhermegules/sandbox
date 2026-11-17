from datetime import datetime, timezone
import pytest

from token_inspector.models.inspection_record import InspectionRecord
from token_inspector.storage.circular_event_buffer import CircularEventBuffer
from token_inspector.storage.inspection_store import InspectionStore, PaginatedInspectionRecords


def create_record(idx: int, model: str) -> InspectionRecord:
    return InspectionRecord(
        id=f"req_{idx:03d}",
        timestamp=datetime.now(timezone.utc),
        method="POST",
        path="/v1/chat/completions",
        model=model,
        status_code=200,
        duration_ms=40.0,
        prompt_tokens=100,
        completion_tokens=20,
        total_tokens=120,
        context_ceiling=128000,
        saturation_pct=0.09,
        estimated_cost_usd=0.0005,
    )


def test_inspection_store_cursor_pagination_and_model_filtering() -> None:
    # Arrange: 15 records of gpt-4o and 10 of gpt-3.5-turbo (total 25 records)
    store = InspectionStore(capacity=100)
    for i in range(15):
        store.add_record(create_record(i, model="gpt-4o"))
    for i in range(15, 25):
        store.add_record(create_record(i, model="gpt-3.5-turbo"))

    # Act 1: Query page 1 for gpt-4o with limit=10
    page1 = store.get_history(cursor=None, limit=10, model="gpt-4o")

    # Assert 1
    assert isinstance(page1, PaginatedInspectionRecords)
    assert len(page1.items) == 10
    assert page1.has_more is True
    assert page1.next_cursor is not None
    assert all(r.model == "gpt-4o" for r in page1.items)

    # Act 2: Query page 2 using next_cursor
    page2 = store.get_history(cursor=page1.next_cursor, limit=10, model="gpt-4o")

    # Assert 2
    assert len(page2.items) == 5
    assert page2.has_more is False
    assert page2.next_cursor is None

    # Verify no duplicates between page 1 and page 2
    page1_ids = {r.id for r in page1.items}
    page2_ids = {r.id for r in page2.items}
    assert page1_ids.isdisjoint(page2_ids)
    assert len(page1_ids | page2_ids) == 15
    assert page1.total_captured == 25
