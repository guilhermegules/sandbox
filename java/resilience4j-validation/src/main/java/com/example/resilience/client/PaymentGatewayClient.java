package com.example.resilience.client;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicInteger;

public class PaymentGatewayClient {

    private final AtomicInteger attempts = new AtomicInteger(0);
    private volatile boolean simulateOutage = false;

    public String processPayment(String transactionId, double amount) throws IOException {
        int attempt = attempts.incrementAndGet();
        if (simulateOutage) {
            throw new IOException("Remote payment gateway unavailable (503 Service Unavailable) on attempt " + attempt);
        }
        return "SUCCESS: txn=" + transactionId + ", amount=" + amount + " (attempt=" + attempt + ")";
    }

    public void setSimulateOutage(boolean simulateOutage) {
        this.simulateOutage = simulateOutage;
    }

    public int getAttempts() {
        return attempts.get();
    }

    public void resetAttempts() {
        attempts.set(0);
    }
}
