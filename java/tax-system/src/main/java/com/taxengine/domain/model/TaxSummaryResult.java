package com.taxengine.domain.model;

import java.util.List;
import java.util.Objects;

public record TaxSummaryResult(
        List<TaxLineItemResult> items,
        Money totalSubtotal,
        Money totalTax,
        Money grandTotal
) {
    public TaxSummaryResult {
        Objects.requireNonNull(items, "items cannot be null");
        Objects.requireNonNull(totalSubtotal, "totalSubtotal cannot be null");
        Objects.requireNonNull(totalTax, "totalTax cannot be null");
        Objects.requireNonNull(grandTotal, "grandTotal cannot be null");
        items = List.copyOf(items);
    }
}
