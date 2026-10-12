package com.example.resilience;

import com.example.resilience.client.PaymentGatewayClient;
import com.example.resilience.service.ResilienceManager;
import io.github.resilience4j.circuitbreaker.CallNotPermittedException;
import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RequestNotPermitted;
import io.github.resilience4j.retry.Retry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Supplier;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ResilienceValidationTest {

    private ResilienceManager manager;
    private PaymentGatewayClient client;

    @BeforeEach
    void setUp() {
        manager = new ResilienceManager();
        client = new PaymentGatewayClient();
    }

    @Test
    @DisplayName("Retry should execute up to configured max attempts upon exception")
    void shouldRetryOnFailure() {
        client.setSimulateOutage(true);
        AtomicInteger invocationCount = new AtomicInteger(0);

        Supplier<String> retryingSupplier = Retry.decorateSupplier(manager.getRetry(), () -> {
            invocationCount.incrementAndGet();
            try {
                return client.processPayment("TXN-RETRY", 25.0);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        assertThatThrownBy(retryingSupplier::get)
                .isInstanceOf(RuntimeException.class);

        // Max configured attempts is 3
        assertThat(invocationCount.get()).isEqualTo(3);
    }

    @Test
    @DisplayName("CircuitBreaker should transition from CLOSED to OPEN when error rate exceeds threshold")
    void shouldOpenCircuitBreakerOnFailures() {
        CircuitBreaker cb = manager.getCircuitBreaker();
        assertThat(cb.getState()).isEqualTo(CircuitBreaker.State.CLOSED);

        // Record 4 failing calls (sliding window size = 4)
        for (int i = 0; i < 4; i++) {
            cb.onError(100, java.util.concurrent.TimeUnit.MILLISECONDS, new IOException("Gateway error"));
        }

        // Circuit breaker should now be OPEN
        assertThat(cb.getState()).isEqualTo(CircuitBreaker.State.OPEN);

        // Further calls should be rejected with CallNotPermittedException without invoking underlying resource
        Supplier<String> protectedCall = CircuitBreaker.decorateSupplier(cb, () -> "OK");
        assertThatThrownBy(protectedCall::get)
                .isInstanceOf(CallNotPermittedException.class);
    }

    @Test
    @DisplayName("RateLimiter should reject requests once limit per period is exhausted")
    void shouldThrottleCallsExceedingRateLimit() {
        Supplier<String> rateLimitedSupplier = RateLimiter.decorateSupplier(manager.getRateLimiter(), () -> "Allowed");

        // Configured limit: 2 per 500ms
        assertThat(rateLimitedSupplier.get()).isEqualTo("Allowed");
        assertThat(rateLimitedSupplier.get()).isEqualTo("Allowed");

        // 3rd call exceeds limit
        assertThatThrownBy(rateLimitedSupplier::get)
                .isInstanceOf(RequestNotPermitted.class);
    }

    @Test
    @DisplayName("Decorated pipeline should execute fallback when errors occur")
    void shouldExecuteFallbackOnFailure() {
        client.setSimulateOutage(true);

        Supplier<String> faultyCall = () -> {
            try {
                return client.processPayment("TXN-FALLBACK", 10.0);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        };

        Supplier<String> fallback = () -> "FALLBACK_RECOVERY";
        Supplier<String> resilientCall = manager.decorateWithAll(faultyCall, fallback);

        String result = resilientCall.get();
        assertThat(result).isEqualTo("FALLBACK_RECOVERY");
    }
}
