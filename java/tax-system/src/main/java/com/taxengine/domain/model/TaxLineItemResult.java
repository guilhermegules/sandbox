package com.taxengine.domain.model;

import java.math.BigDecimal;
import java.util.Objects;

public record TaxLineItemResult(
        Product product,
        int quantity,
        Money subtotal,
        BigDecimal effectiveRate,
        Money taxAmount,
        String ruleDescription
) {
    public TaxLineItemResult {
        Objects.requireNonNull(product, "product cannot be null");
        Objects.requireNonNull(subtotal, "subtotal cannot be null");
        Objects.requireNonNull(effectiveRate, "effectiveRate cannot be null");
        Objects.requireNonNull(taxAmount, "taxAmount cannot be null");
        Objects.requireNonNull(ruleDescription, "ruleDescription cannot be null");
    }

    public Money total() {
        return subtotal.plus(taxAmount);
    }
}
