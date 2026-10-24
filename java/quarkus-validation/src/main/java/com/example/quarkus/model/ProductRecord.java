package com.example.quarkus.model;

import java.math.BigDecimal;

public record ProductRecord(
        String id,
        String name,
        BigDecimal price,
        String category
) {}
