package com.taxengine.domain.rule;

public sealed interface TaxRule permits StandardRateRule, ExemptionRule, ThresholdRule {
    String description();
}
