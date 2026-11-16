from typing import List, Optional
from pydantic import BaseModel, Field

from token_inspector.models.inspection_record import InspectionRecord
from token_inspector.storage.circular_event_buffer import CircularEventBuffer


class PaginatedInspectionRecords(BaseModel):
    items: List[InspectionRecord] = Field(default_factory=list)
    next_cursor: Optional[str] = None
    has_more: bool = False
    total_captured: int = 0


class InspectionStore:
    """In-memory store providing cursor-based pagination and model-based filtering."""

    def __init__(
        self,
        capacity: int = 1000,
        buffer: Optional[CircularEventBuffer[InspectionRecord]] = None,
    ) -> None:
        self._buffer = buffer or CircularEventBuffer[InspectionRecord](capacity=capacity)

    def add_record(self, record: InspectionRecord) -> None:
        self._buffer.append(record)

    def get_record(self, record_id: str) -> Optional[InspectionRecord]:
        for item in self._buffer.get_all():
            if item.id == record_id:
                return item
        return None

    def get_history(
        self,
        cursor: Optional[str] = None,
        limit: int = 50,
        model: Optional[str] = None,
    ) -> PaginatedInspectionRecords:
        all_items = self._buffer.get_all()
        total_captured = len(all_items)

        # Developer timeline: latest requests first (reverse order)
        chronological_reversed = list(reversed(all_items))

        # Filter by model if requested
        if model:
            matching = [r for r in chronological_reversed if r.model == model]
        else:
            matching = chronological_reversed

        # Cursor search
        start_idx = 0
        if cursor:
            for idx, r in enumerate(matching):
                if r.id == cursor:
                    start_idx = idx + 1
                    break

        page_slice = matching[start_idx : start_idx + limit]
        has_more = (start_idx + limit) < len(matching)
        next_cursor = page_slice[-1].id if has_more and page_slice else None

        return PaginatedInspectionRecords(
            items=page_slice,
            next_cursor=next_cursor,
            has_more=has_more,
            total_captured=total_captured,
        )
