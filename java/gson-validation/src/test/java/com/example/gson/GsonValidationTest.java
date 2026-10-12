package com.example.gson;

import com.example.gson.model.Order;
import com.example.gson.model.OrderStatus;
import com.example.gson.model.Product;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class GsonValidationTest {

    private Gson gson;

    @BeforeEach
    void setUp() {
        gson = GsonValidationApp.createConfiguredGson();
    }

    @Test
    @DisplayName("Should serialize and deserialize Record preserving nested fields and snake_case naming")
    void shouldSerializeAndDeserializeRecord() {
        Instant now = Instant.parse("2026-10-10T12:00:00Z");
        Product item = new Product("SKU-1", "Monitor", new BigDecimal("349.99"), List.of("office", "display"));
        Order order = new Order("ORD-001", "CUST-1", OrderStatus.PENDING, List.of(item), now, "Handle with care");

        String json = gson.toJson(order);

        // Assert JSON contains custom snake_case field names
        JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();
        assertThat(jsonObject.has("order_id")).isTrue();
        assertThat(jsonObject.get("order_id").getAsString()).isEqualTo("ORD-001");
        assertThat(jsonObject.get("created_at").getAsString()).isEqualTo("2026-10-10T12:00:00Z");

        // Assert nested array serialized correctly with @SerializedName
        JsonObject productObject = jsonObject.getAsJsonArray("items").get(0).getAsJsonObject();
        assertThat(productObject.get("product_id").getAsString()).isEqualTo("SKU-1");

        // Assert deserialization restores exact object
        Order deserialized = gson.fromJson(json, Order.class);
        assertThat(deserialized).isEqualTo(order);
    }

    @Test
    @DisplayName("Should handle generic collections accurately using TypeToken")
    void shouldHandleGenericCollectionsWithTypeToken() {
        List<Product> products = List.of(
                new Product("P1", "Item A", new BigDecimal("10.00"), List.of("a")),
                new Product("P2", "Item B", new BigDecimal("20.00"), List.of("b"))
        );

        Type typeToken = new TypeToken<List<Product>>() {}.getType();
        String json = gson.toJson(products, typeToken);

        List<Product> result = gson.fromJson(json, typeToken);
        assertThat(result)
                .hasSize(2)
                .containsExactlyElementsOf(products);
    }

    @Test
    @DisplayName("Should explicitly serialize null values when configured")
    void shouldSerializeNullValues() {
        Product p = new Product("P-NULL", "Null Price Item", null, null);
        String json = gson.toJson(p);

        JsonObject jsonObject = JsonParser.parseString(json).getAsJsonObject();
        assertThat(jsonObject.has("price")).isTrue();
        assertThat(jsonObject.get("price").isJsonNull()).isTrue();
    }
}
