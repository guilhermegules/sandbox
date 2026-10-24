package com.example.gson.model;

import com.google.gson.annotations.SerializedName;
import java.math.BigDecimal;
import java.util.List;

public record Product(
        @SerializedName("product_id") String id,
        String name,
        BigDecimal price,
        List<String> tags
) {}
