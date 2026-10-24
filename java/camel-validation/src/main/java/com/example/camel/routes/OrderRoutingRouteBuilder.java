package com.example.camel.routes;

import org.apache.camel.builder.RouteBuilder;

public class OrderRoutingRouteBuilder extends RouteBuilder {

    @Override
    public void configure() {
        // Global error handler for invalid orders
        onException(IllegalArgumentException.class)
                .handled(true)
                .transform(simple("ERROR: ${exception.message}"))
                .to("mock:errors");

        // Route 1: Content-Based Router (VIP vs Standard Orders)
        from("direct:processOrder")
                .routeId("order-processor-route")
                .process(exchange -> {
                    String body = exchange.getMessage().getBody(String.class);
                    if (body == null || body.isBlank()) {
                        throw new IllegalArgumentException("Order payload cannot be empty");
                    }
                })
                .choice()
                    .when(header("tier").isEqualTo("gold"))
                        .transform(simple("[VIP PRIORITY] ${body}"))
                        .to("seda:vipOrders?waitForTaskToComplete=Never")
                        .to("mock:goldOrders")
                    .otherwise()
                        .transform(simple("[STANDARD] ${body}"))
                        .to("seda:standardOrders?waitForTaskToComplete=Never")
                        .to("mock:standardOrders")
                .end();

        // Route 2: Splitter EIP (Batch orders processing)
        from("direct:splitBatch")
                .routeId("batch-splitter-route")
                .split(body().tokenize(","))
                    .streaming()
                    .process(exchange -> {
                        String item = exchange.getMessage().getBody(String.class).trim();
                        exchange.getMessage().setBody("ProcessedItem:" + item);
                    })
                    .to("mock:splitItems")
                .end();
    }
}
