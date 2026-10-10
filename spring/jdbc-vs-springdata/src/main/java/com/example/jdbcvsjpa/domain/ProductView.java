package com.example.jdbcvsjpa.domain;

import java.math.BigDecimal;

public record ProductView(Long id, String name, BigDecimal price, Integer stock) {
}