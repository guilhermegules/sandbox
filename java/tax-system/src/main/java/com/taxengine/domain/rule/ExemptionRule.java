package com.taxengine.domain.rule;

import java.util.Objects;

public record ExemptionRule(String description) implements TaxRule {

    public ExemptionRule {
        Objects.requireNonNull(description, "description cannot be null");
    }

    public ExemptionRule() {
        this("Tax exempt");
    }
}
