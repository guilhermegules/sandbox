package com.taxengine.domain.model;

import java.util.Objects;

public record Product(String id, String name, TaxCategory category, Money price) {

    public Product {
        Objects.requireNonNull(id, "id cannot be null");
        Objects.requireNonNull(name, "name cannot be null");
        Objects.requireNonNull(category, "category cannot be null");
        Objects.requireNonNull(price, "price cannot be null");
    }
}
