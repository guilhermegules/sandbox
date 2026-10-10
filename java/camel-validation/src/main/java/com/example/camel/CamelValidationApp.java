package com.example.camel;

import com.example.camel.routes.OrderRoutingRouteBuilder;
import org.apache.camel.CamelContext;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.impl.DefaultCamelContext;

import java.util.Map;

public class CamelValidationApp {

    public static void main(String[] args) throws Exception {
        System.out.println("=== Apache Camel EIP Validation Showcase ===");

        try (CamelContext context = new DefaultCamelContext()) {
            context.addRoutes(new OrderRoutingRouteBuilder());
            context.start();
            System.out.println("\n[1] CamelContext started. Routes active: " + context.getRoutes().size());

            ProducerTemplate template = context.createProducerTemplate();

            // 1. Send VIP Gold Order
            System.out.println("\n[2] Sending Gold Order to 'direct:processOrder'...");
            String goldResponse = template.requestBodyAndHeaders(
                    "direct:processOrder",
                    "MacBook Pro M3 Max",
                    Map.of("tier", "gold"),
                    String.class
            );
            System.out.println("  Processed Gold Result: " + goldResponse);

            // 2. Send Standard Order
            System.out.println("\n[3] Sending Standard Order to 'direct:processOrder'...");
            String standardResponse = template.requestBodyAndHeaders(
                    "direct:processOrder",
                    "USB-C Charging Cable",
                    Map.of("tier", "standard"),
                    String.class
            );
            System.out.println("  Processed Standard Result: " + standardResponse);

            // 3. Splitter EIP
            System.out.println("\n[4] Splitting CSV Batch Order through 'direct:splitBatch'...");
            template.sendBody("direct:splitBatch", "Mouse,Keyboard,Monitor,DeskPad");
            System.out.println("  Batch CSV successfully split and routed to individual item handlers.");

            // 4. Exception Handling
            System.out.println("\n[5] Testing onException handling with empty payload...");
            String errorResult = template.requestBody("direct:processOrder", "   ", String.class);
            System.out.println("  Caught and handled: " + errorResult);

            context.stop();
            System.out.println("\n[6] CamelContext gracefully stopped.");
        }
        System.out.println("=== Apache Camel Showcase Completed ===");
    }
}
