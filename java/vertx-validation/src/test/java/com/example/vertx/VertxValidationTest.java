package com.example.vertx;

import com.example.vertx.verticle.HttpServerVerticle;
import com.example.vertx.verticle.OrderWorkerVerticle;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.client.WebClient;
import io.vertx.junit5.VertxExtension;
import io.vertx.junit5.VertxTestContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(VertxExtension.class)
class VertxValidationTest {

    private static final int PORT = 9091;

    @BeforeEach
    void deployVerticles(Vertx vertx, VertxTestContext testContext) {
        vertx.deployVerticle(new OrderWorkerVerticle())
                .compose(v1 -> vertx.deployVerticle(new HttpServerVerticle(PORT)))
                .onComplete(testContext.succeedingThenComplete());
    }

    @Test
    @DisplayName("Event bus point-to-point request-reply should calculate order tax and total")
    void testEventBusRequestReply(Vertx vertx, VertxTestContext testContext) {
        JsonObject order = new JsonObject().put("orderId", "EB-01").put("amount", 100.0);

        vertx.eventBus().<JsonObject>request(OrderWorkerVerticle.ADDRESS_ORDER_PROCESS, order, testContext.succeeding(reply -> {
            testContext.verify(() -> {
                JsonObject body = reply.body();
                assertThat(body.getString("orderId")).isEqualTo("EB-01");
                assertThat(body.getDouble("tax")).isEqualTo(8.0);
                assertThat(body.getDouble("total")).isEqualTo(108.0);
                assertThat(body.getString("status")).isEqualTo("CONFIRMED");
                testContext.completeNow();
            });
        }));
    }

    @Test
    @DisplayName("HTTP GET /api/health should return UP status")
    void testHealthEndpoint(Vertx vertx, VertxTestContext testContext) {
        WebClient client = WebClient.create(vertx);

        client.get(PORT, "localhost", "/api/health")
                .send(testContext.succeeding(response -> {
                    testContext.verify(() -> {
                        assertThat(response.statusCode()).isEqualTo(200);
                        assertThat(response.bodyAsJsonObject().getString("status")).isEqualTo("UP");
                        testContext.completeNow();
                    });
                }));
    }

    @Test
    @DisplayName("HTTP POST /api/orders should route through EventBus and return calculated result")
    void testPostOrderEndpoint(Vertx vertx, VertxTestContext testContext) {
        WebClient client = WebClient.create(vertx);
        JsonObject request = new JsonObject().put("orderId", "HTTP-99").put("amount", 200.0);

        client.post(PORT, "localhost", "/api/orders")
                .sendJsonObject(request, testContext.succeeding(response -> {
                    testContext.verify(() -> {
                        assertThat(response.statusCode()).isEqualTo(200);
                        JsonObject body = response.bodyAsJsonObject();
                        assertThat(body.getString("orderId")).isEqualTo("HTTP-99");
                        assertThat(body.getDouble("total")).isEqualTo(216.0);
                        testContext.completeNow();
                    });
                }));
    }
}
