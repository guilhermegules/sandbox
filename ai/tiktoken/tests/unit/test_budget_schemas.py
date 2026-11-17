import pytest
from pydantic import ValidationError

from token_inspector.models.budget_schemas import (
    ContextBudgetRequest,
    ContextMessage,
    PriorityTier,
    TruncationDiff,
    TruncationResult,
)


def test_budget_schemas_valid_construction() -> None:
    # Arrange
    msg1 = ContextMessage(role="system", content="Act as helper.", priority=PriorityTier.SYSTEM_RULES)
    msg2 = ContextMessage(role="user", content="Hello!", priority=PriorityTier.USER_QUERY)
    request = ContextBudgetRequest(
        messages=[msg1, msg2],
        max_tokens=2048,
        model="gpt-4o",
        allow_user_truncation=False,
    )

    # Act
    json_str = request.model_dump_json()
    reconstructed = ContextBudgetRequest.model_validate_json(json_str)

    # Assert
    assert reconstructed.max_tokens == 2048
    assert reconstructed.messages[0].priority == PriorityTier.SYSTEM_RULES
    assert reconstructed.messages[1].role == "user"


def test_budget_schemas_validation_error_on_zero_or_negative_tokens() -> None:
    # Arrange & Act & Assert
    with pytest.raises(ValidationError):
        ContextBudgetRequest(
            messages=[ContextMessage(role="user", content="hi")],
            max_tokens=0,  # Must be gt=0
        )

    with pytest.raises(ValidationError):
        ContextBudgetRequest(
            messages=[ContextMessage(role="user", content="hi")],
            max_tokens=-50,
        )


def test_truncation_result_serialization() -> None:
    # Arrange
    diff = TruncationDiff(
        original_tokens=3000,
        truncated_tokens=1500,
        tokens_saved=1500,
        pruned_message_indices=[2, 3],
    )
    result = TruncationResult(
        messages=[{"role": "user", "content": "hi"}],
        diff=diff,
        is_budget_satisfied=True,
        json_ast_validated=True,
        markdown_repaired=False,
    )

    # Act
    json_out = result.model_dump_json()
    reconstructed = TruncationResult.model_validate_json(json_out)

    # Assert
    assert reconstructed.diff.tokens_saved == 1500
    assert reconstructed.diff.pruned_message_indices == [2, 3]
    assert reconstructed.is_budget_satisfied is True
