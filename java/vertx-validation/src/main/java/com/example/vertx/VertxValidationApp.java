package com.example.vertx;

import com.example.vertx.verticle.HttpServerVerticle;
import com.example.vertx.verticle.OrderWorkerVerticle;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.client.WebClient;

public class VertxValidationApp {

    public static void main(String[] args) {
        System.out.println("=== Eclipse Vert.x Reactive Toolkit Validation Showcase ===");
        Vertx vertx = Vertx.vertx();
        int testPort = 8089;

        // 1. Deploy worker and HTTP verticles
        vertx.deployVerticle(new OrderWorkerVerticle())
                .compose(v1 -> vertx.deployVerticle(new HttpServerVerticle(testPort)))
                .compose(v2 -> {
                    System.out.println("[1] Verticles deployed. HTTP server listening on http://localhost:" + testPort);

                    // 2. Perform non-blocking HTTP client call
                    WebClient client = WebClient.create(vertx);
                    JsonObject sampleOrder = new JsonObject()
                            .put("orderId", "ORD-VX-101")
                            .put("amount", 250.0);

                    System.out.println("\n[2] Sending non-blocking HTTP POST /api/orders via WebClient...");
                    return client.post(testPort, "localhost", "/api/orders")
                            .sendJsonObject(sampleOrder);
                })
                .onSuccess(response -> {
                    System.out.println("\n[3] HTTP Response Status: " + response.statusCode());
                    System.out.println("  Payload: " + response.bodyAsString());

                    // Close Vertx
                    vertx.close().onComplete(ar -> {
                        System.out.println("\n[4] Vert.x instance closed.");
                        System.out.println("=== Vert.x Showcase Completed ===");
                    });
                })
                .onFailure(err -> {
                    System.err.println("Failed: " + err.getMessage());
                    vertx.close();
                });
    }
}
