package com.example.jdbcvsjpa.domain;

import java.math.BigDecimal;

public record ProductPayload(String name, BigDecimal price, Integer stock) {
}