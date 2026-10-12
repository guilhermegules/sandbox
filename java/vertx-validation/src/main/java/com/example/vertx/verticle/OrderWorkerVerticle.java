package com.example.vertx.verticle;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonObject;

public class OrderWorkerVerticle extends AbstractVerticle {

    public static final String ADDRESS_ORDER_PROCESS = "orders.process";
    public static final String ADDRESS_ORDER_AUDIT = "orders.audit";

    @Override
    public void start(Promise<Void> startPromise) {
        // Consumer listening on orders.process
        vertx.eventBus().<JsonObject>consumer(ADDRESS_ORDER_PROCESS, message -> {
            JsonObject order = message.body();
            String orderId = order.getString("orderId", "UNKNOWN");
            double amount = order.getDouble("amount", 0.0);

            double tax = amount * 0.08;
            double total = amount + tax;

            JsonObject response = new JsonObject()
                    .put("orderId", orderId)
                    .put("amount", amount)
                    .put("tax", tax)
                    .put("total", total)
                    .put("status", "CONFIRMED");

            // Reply back to sender
            message.reply(response);

            // Publish audit notification to all subscribers
            vertx.eventBus().publish(ADDRESS_ORDER_AUDIT, new JsonObject()
                    .put("event", "ORDER_PROCESSED")
                    .put("orderId", orderId));
        });

        startPromise.complete();
    }
}
