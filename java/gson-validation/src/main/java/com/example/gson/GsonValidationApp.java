package com.example.gson;

import com.example.gson.adapter.InstantAdapter;
import com.example.gson.model.Order;
import com.example.gson.model.OrderStatus;
import com.example.gson.model.Product;
import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public class GsonValidationApp {

    public static Gson createConfiguredGson() {
        return new GsonBuilder()
                .registerTypeAdapter(Instant.class, new InstantAdapter())
                .setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
                .serializeNulls()
                .setPrettyPrinting()
                .create();
    }

    public static void main(String[] args) {
        System.out.println("=== Gson Validation Showcase ===");
        Gson gson = createConfiguredGson();

        List<Product> products = List.of(
                new Product("P101", "Mechanical Keyboard", new BigDecimal("129.99"), List.of("electronics", "hardware")),
                new Product("P102", "Wireless Mouse", new BigDecimal("59.50"), List.of("electronics", "accessories"))
        );

        Order sampleOrder = new Order(
                "ORD-9901",
                "CUST-42",
                OrderStatus.CONFIRMED,
                products,
                Instant.now(),
                null
        );

        // 1. Serialization
        String json = gson.toJson(sampleOrder);
        System.out.println("\n[1] Serialized Order to JSON (with snake_case & nulls):");
        System.out.println(json);

        // 2. Deserialization
        Order deserialized = gson.fromJson(json, Order.class);
        System.out.println("\n[2] Deserialized back to Java Record:");
        System.out.printf("Order ID: %s, Customer: %s, Items: %d, Status: %s%n",
                deserialized.orderId(), deserialized.customerId(), deserialized.items().size(), deserialized.status());

        // 3. Generic Collections with TypeToken
        Type productListType = new TypeToken<List<Product>>() {}.getType();
        String listJson = gson.toJson(products, productListType);
        List<Product> deserializedList = gson.fromJson(listJson, productListType);
        System.out.println("\n[3] Generic List round-trip with TypeToken:");
        System.out.printf("Restored %d products successfully.%n", deserializedList.size());
    }
}
