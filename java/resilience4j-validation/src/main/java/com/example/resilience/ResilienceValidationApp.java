package com.example.resilience;

import com.example.resilience.client.PaymentGatewayClient;
import com.example.resilience.service.ResilienceManager;

import java.util.function.Supplier;

public class ResilienceValidationApp {

    public static void main(String[] args) {
        System.out.println("=== Resilience4j Fault Tolerance Validation Showcase ===");

        ResilienceManager manager = new ResilienceManager();
        PaymentGatewayClient client = new PaymentGatewayClient();

        Supplier<String> healthySupplier = () -> {
            try {
                return client.processPayment("TXN-100", 50.0);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        };

        Supplier<String> fallback = () -> "FALLBACK: Payment queued offline for deferred processing";

        // 1. Normal execution
        System.out.println("\n[1] Invoking resilient call when upstream is healthy:");
        Supplier<String> resilientCall = manager.decorateWithAll(healthySupplier, fallback);
        System.out.println("  Result: " + resilientCall.get());
        System.out.println("  CircuitBreaker state: " + manager.getCircuitBreaker().getState());

        // 2. Failure with Retry and Fallback
        System.out.println("\n[2] Simulating gateway failure with Retry & Fallback:");
        client.setSimulateOutage(true);
        client.resetAttempts();

        String failedResult = resilientCall.get();
        System.out.println("  Result received: " + failedResult);
        System.out.printf("  Total retry attempts made before falling back: %d%n", client.getAttempts());
        System.out.println("  CircuitBreaker state: " + manager.getCircuitBreaker().getState());

        // 3. Rate Limiting showcase
        System.out.println("\n[3] Testing RateLimiter permissions:");
        client.setSimulateOutage(false);
        for (int i = 1; i <= 4; i++) {
            boolean acquired = manager.getRateLimiter().acquirePermission();
            System.out.printf("  Request #%d permit acquired: %s%n", i, acquired);
        }

        System.out.println("\n=== Resilience4j Showcase Completed ===");
    }
}
