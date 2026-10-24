package com.example.quarkus;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.Matchers.hasSize;

@QuarkusTest
class QuarkusValidationTest {

    @Test
    @DisplayName("GET /api/greeting should return configured greeting prefix")
    void testGreetingEndpoint() {
        given()
                .when().get("/api/greeting?name=Gemini")
                .then()
                .statusCode(200)
                .body(containsString("Welcome to Supersonic Subatomic Java, Gemini!"));
    }

    @Test
    @DisplayName("GET /api/products should return list of products")
    void testGetProductsEndpoint() {
        given()
                .when().get("/api/products")
                .then()
                .statusCode(200)
                .body("$", hasSize(2))
                .body("[0].id", equalTo("QK-01"))
                .body("[0].category", equalTo("Cloud-Native"));
    }

    @Test
    @DisplayName("POST /api/products should echo created product with 201 Created")
    void testCreateProductEndpoint() {
        String newProductJson = """
                {
                    "id": "QK-03",
                    "name": "Kubernetes Microservice",
                    "price": 19.99,
                    "category": "Cloud"
                }
                """;

        given()
                .contentType(ContentType.JSON)
                .body(newProductJson)
                .when().post("/api/products")
                .then()
                .statusCode(201)
                .body("id", equalTo("QK-03"))
                .body("name", equalTo("Kubernetes Microservice"));
    }
}
