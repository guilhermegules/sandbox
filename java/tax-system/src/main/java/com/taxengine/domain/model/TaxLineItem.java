package com.taxengine.domain.model;

import java.util.Objects;

public record TaxLineItem(Product product, int quantity) {

    public TaxLineItem {
        Objects.requireNonNull(product, "product cannot be null");
        if (quantity <= 0) {
            throw new IllegalArgumentException("quantity must be greater than zero");
        }
    }

    public Money subtotal() {
        return product.price().multiply(quantity);
    }
}
