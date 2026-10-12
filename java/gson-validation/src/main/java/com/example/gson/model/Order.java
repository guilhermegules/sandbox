package com.example.gson.model;

import java.time.Instant;
import java.util.List;

public record Order(
        String orderId,
        String customerId,
        OrderStatus status,
        List<Product> items,
        Instant createdAt,
        String notes
) {}
