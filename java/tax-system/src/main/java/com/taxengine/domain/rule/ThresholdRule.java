package com.taxengine.domain.rule;

import com.taxengine.domain.model.Money;

import java.math.BigDecimal;
import java.util.Objects;

public record ThresholdRule(
        Money threshold,
        BigDecimal belowThresholdRate,
        BigDecimal aboveThresholdRate,
        String description
) implements TaxRule {

    public ThresholdRule {
        Objects.requireNonNull(threshold, "threshold cannot be null");
        Objects.requireNonNull(belowThresholdRate, "belowThresholdRate cannot be null");
        Objects.requireNonNull(aboveThresholdRate, "aboveThresholdRate cannot be null");
        Objects.requireNonNull(description, "description cannot be null");
    }
}
