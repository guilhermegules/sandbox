package com.example;

import org.apache.camel.CamelContext;
import org.apache.camel.Route;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.impl.DefaultCamelContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class App {

    private static final Logger log = LoggerFactory.getLogger(App.class);

    public static void main(String[] args) throws Exception {
        log.info("Starting Apache Camel File Transformation POC");

        try (CamelContext context = new DefaultCamelContext()) {
            context.addRoutes(createRoute());

            log.info("Starting Camel context...");
            context.start();

            log.info("Route started. Watching input/ folder for JSON files...");
            log.info("Press Enter to stop...");
            System.in.read();

            log.info("Stopping Camel context...");
            context.stop();
        }

        log.info("Application finished");
    }

    private static RouteBuilder createRoute() {
        return new RouteBuilder() {
            @Override
            public void configure() {
                from("file:input?noop=true&include=.*\\.json&delay=1000")
                    .routeId("file-transformation-route")
                    .log(">>> Received file: ${header.CamelFileName}")
                    .log(">>> File size: ${header.CamelFileLength} bytes")
                    .process(new OrderProcessor())
                    .log(">>> Transformed body length: ${body.length()}")
                    .to("file:output?fileName=processed-${header.CamelFileName}")
                    .log(">>> File written to output folder")
                    .log(">>> Headers: ${headers}");
            }
        };
    }
}
