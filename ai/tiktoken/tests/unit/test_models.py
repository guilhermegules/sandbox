from datetime import datetime, timezone
import pytest
from pydantic import ValidationError

from token_inspector.models.token_item import SubwordInfo, TokenItem
from token_inspector.models.inspection_record import RoleTokenBreakdown, InspectionRecord


def test_token_item_valid_instantiation_and_serialization() -> None:
    # Arrange
    subword = SubwordInfo(is_subword_continuation=False, word_boundary_index=0)
    token = TokenItem(
        index=0,
        token_id=9906,
        text="Hello",
        raw_bytes="0x48 0x65 0x6c 0x6c 0x6f",
        byte_length=5,
        is_whitespace=False,
        subword_info=subword,
        logprob=-0.05,
        probability_pct=95.12,
    )

    # Act
    json_data = token.model_dump_json()
    reconstructed = TokenItem.model_validate_json(json_data)

    # Assert
    assert reconstructed.token_id == 9906
    assert reconstructed.text == "Hello"
    assert reconstructed.subword_info.is_subword_continuation is False
    assert reconstructed.probability_pct == pytest.approx(95.12)


def test_token_item_validation_error_on_invalid_types() -> None:
    # Arrange & Act & Assert
    with pytest.raises(ValidationError):
        TokenItem(
            index=-1,  # negative index should fail if ge=0
            token_id="invalid_id",  # type: ignore[arg-type]
            text="Hello",
            raw_bytes="0x00",
            byte_length=1,
            is_whitespace=False,
            subword_info=SubwordInfo(is_subword_continuation=False, word_boundary_index=0),
        )


def test_inspection_record_valid_serialization() -> None:
    # Arrange
    now = datetime.now(timezone.utc)
    token = TokenItem(
        index=0,
        token_id=15339,
        text="hello",
        raw_bytes="0x68 0x65 0x6c 0x6c 0x6f",
        byte_length=5,
        is_whitespace=False,
        subword_info=SubwordInfo(is_subword_continuation=False, word_boundary_index=0),
    )
    breakdown = RoleTokenBreakdown(role="user", token_count=1, tokens=[token])
    record = InspectionRecord(
        id="req_test_01",
        timestamp=now,
        method="POST",
        path="/v1/chat/completions",
        model="gpt-4o",
        status_code=200,
        duration_ms=45.2,
        ttfb_ms=12.1,
        is_streaming=False,
        prompt_tokens=10,
        completion_tokens=5,
        total_tokens=15,
        context_ceiling=128000,
        saturation_pct=0.0117,
        estimated_cost_usd=0.000075,
        messages_breakdown=[breakdown],
        completion_tokens_detail=[token],
        raw_request_headers={"content-type": "application/json"},
        raw_response_headers={"content-type": "application/json"},
    )

    # Act
    json_repr = record.model_dump_json()
    deserialized = InspectionRecord.model_validate_json(json_repr)

    # Assert
    assert deserialized.id == "req_test_01"
    assert deserialized.total_tokens == 15
    assert len(deserialized.messages_breakdown) == 1
    assert deserialized.messages_breakdown[0].role == "user"


def test_inspection_record_validation_error_on_invalid_fields() -> None:
    # Arrange & Act & Assert
    with pytest.raises(ValidationError):
        InspectionRecord(
            id="req_bad",
            timestamp="not-a-datetime",  # type: ignore[arg-type]
            model="gpt-4o",
            duration_ms=-10.0,
            prompt_tokens=-1,  # Invalid negative tokens
            total_tokens=-1,
            context_ceiling=0,
            saturation_pct=-5.0,
            estimated_cost_usd=-1.0,
        )
