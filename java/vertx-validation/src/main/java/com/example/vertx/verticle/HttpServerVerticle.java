package com.example.vertx.verticle;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;

public class HttpServerVerticle extends AbstractVerticle {

    private final int port;

    public HttpServerVerticle(int port) {
        this.port = port;
    }

    public HttpServerVerticle() {
        this(8080);
    }

    @Override
    public void start(Promise<Void> startPromise) {
        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());

        // Health endpoint
        router.get("/api/health").handler(ctx -> ctx.response()
                .putHeader("content-type", "application/json")
                .end(new JsonObject().put("status", "UP").encode()));

        // Orders endpoint forwarding to EventBus
        router.post("/api/orders").handler(ctx -> {
            JsonObject orderRequest = ctx.body().asJsonObject();
            vertx.eventBus().<JsonObject>request(OrderWorkerVerticle.ADDRESS_ORDER_PROCESS, orderRequest, reply -> {
                if (reply.succeeded()) {
                    ctx.response()
                            .setStatusCode(200)
                            .putHeader("content-type", "application/json")
                            .end(reply.result().body().encode());
                } else {
                    ctx.response()
                            .setStatusCode(500)
                            .end(new JsonObject().put("error", reply.cause().getMessage()).encode());
                }
            });
        });

        vertx.createHttpServer()
                .requestHandler(router)
                .listen(port, http -> {
                    if (http.succeeded()) {
                        startPromise.complete();
                    } else {
                        startPromise.fail(http.cause());
                    }
                });
    }
}
