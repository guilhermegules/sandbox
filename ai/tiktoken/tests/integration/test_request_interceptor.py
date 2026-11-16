from typing import Any, Dict
import pytest

from token_inspector.proxy.request_interceptor import RequestInterceptor


def test_request_interceptor_pre_flight_metrics_and_headers() -> None:
    # Arrange
    payload: Dict[str, Any] = {
        "model": "gpt-4o",
        "messages": [
            {"role": "system", "content": "You are a test assistant."},
            {"role": "user", "content": "Hello, world!"},
        ],
        "stream": False,
    }
    interceptor = RequestInterceptor()

    # Act
    intercepted = interceptor.intercept_request(payload, request_id="req_test_123")

    # Assert
    assert intercepted.request_id == "req_test_123"
    assert intercepted.model == "gpt-4o"
    assert intercepted.prompt_tokens > 0
    assert intercepted.context_ceiling == 128000
    assert intercepted.saturation_pct > 0.0
    assert intercepted.estimated_cost_usd > 0.0
    assert intercepted.is_streaming is False
    assert len(intercepted.messages_breakdown) == 2

    # Verify injected debug headers
    headers = intercepted.injected_headers
    assert headers["X-Token-Inspector-Prompt-Tokens"] == str(intercepted.prompt_tokens)
    assert headers["X-Token-Inspector-Request-ID"] == "req_test_123"
    assert "X-Token-Inspector-Cost-USD" in headers
    assert "X-Token-Inspector-Saturation-Pct" in headers
