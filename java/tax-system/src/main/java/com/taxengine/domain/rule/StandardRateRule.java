package com.taxengine.domain.rule;

import java.math.BigDecimal;
import java.util.Objects;

public record StandardRateRule(BigDecimal rate, String description) implements TaxRule {

    public StandardRateRule {
        Objects.requireNonNull(rate, "rate cannot be null");
        Objects.requireNonNull(description, "description cannot be null");
        if (rate.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("rate cannot be negative");
        }
    }

    public StandardRateRule(BigDecimal rate) {
        this(rate, "Standard rate: " + rate.multiply(BigDecimal.valueOf(100)).stripTrailingZeros().toPlainString() + "%");
    }
}
