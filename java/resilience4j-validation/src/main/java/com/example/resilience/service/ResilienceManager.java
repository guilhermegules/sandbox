package com.example.resilience.service;

import io.github.resilience4j.bulkhead.Bulkhead;
import io.github.resilience4j.bulkhead.BulkheadConfig;
import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.decorators.Decorators;
import io.github.resilience4j.ratelimiter.RateLimiter;
import io.github.resilience4j.ratelimiter.RateLimiterConfig;
import io.github.resilience4j.retry.Retry;
import io.github.resilience4j.retry.RetryConfig;

import java.io.IOException;
import java.time.Duration;
import java.util.function.Supplier;

public class ResilienceManager {

    private final CircuitBreaker circuitBreaker;
    private final Retry retry;
    private final RateLimiter rateLimiter;
    private final Bulkhead bulkhead;

    public ResilienceManager() {
        // 1. Circuit Breaker: Sliding window of 4 calls, minimum 4 calls to evaluate, 50% failure rate triggers OPEN
        CircuitBreakerConfig cbConfig = CircuitBreakerConfig.custom()
                .slidingWindowType(CircuitBreakerConfig.SlidingWindowType.COUNT_BASED)
                .slidingWindowSize(4)
                .minimumNumberOfCalls(4)
                .failureRateThreshold(50.0f)
                .waitDurationInOpenState(Duration.ofMillis(500))
                .permittedNumberOfCallsInHalfOpenState(2)
                .recordExceptions(Exception.class)
                .build();
        this.circuitBreaker = CircuitBreaker.of("paymentCircuitBreaker", cbConfig);

        // 2. Retry: Up to 3 attempts with 50ms interval
        RetryConfig retryConfig = RetryConfig.custom()
                .maxAttempts(3)
                .waitDuration(Duration.ofMillis(50))
                .retryExceptions(Exception.class)
                .build();
        this.retry = Retry.of("paymentRetry", retryConfig);

        // 3. Rate Limiter: 2 calls per period of 500ms
        RateLimiterConfig rlConfig = RateLimiterConfig.custom()
                .limitForPeriod(2)
                .limitRefreshPeriod(Duration.ofMillis(500))
                .timeoutDuration(Duration.ZERO) // Fail immediately if no permit
                .build();
        this.rateLimiter = RateLimiter.of("paymentRateLimiter", rlConfig);

        // 4. Bulkhead: Max 2 concurrent calls
        BulkheadConfig bhConfig = BulkheadConfig.custom()
                .maxConcurrentCalls(2)
                .maxWaitDuration(Duration.ZERO)
                .build();
        this.bulkhead = Bulkhead.of("paymentBulkhead", bhConfig);
    }

    public <T> Supplier<T> decorateWithAll(Supplier<T> supplier, Supplier<T> fallback) {
        return Decorators.ofSupplier(supplier)
                .withCircuitBreaker(circuitBreaker)
                .withRetry(retry)
                .withRateLimiter(rateLimiter)
                .withBulkhead(bulkhead)
                .withFallback(throwable -> fallback.get())
                .decorate();
    }

    public CircuitBreaker getCircuitBreaker() {
        return circuitBreaker;
    }

    public Retry getRetry() {
        return retry;
    }

    public RateLimiter getRateLimiter() {
        return rateLimiter;
    }

    public Bulkhead getBulkhead() {
        return bulkhead;
    }
}
