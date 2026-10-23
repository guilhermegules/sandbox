package com.taxengine.domain.model;

import java.time.Year;
import java.util.List;
import java.util.Objects;

public record TaxCalculationRequest(State state, Year year, List<TaxLineItem> items) {

    public TaxCalculationRequest {
        Objects.requireNonNull(state, "state cannot be null");
        Objects.requireNonNull(year, "year cannot be null");
        Objects.requireNonNull(items, "items cannot be null");
        items = List.copyOf(items);
        if (items.isEmpty()) {
            throw new IllegalArgumentException("items cannot be empty");
        }
    }
}
