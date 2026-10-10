package com.example;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Instant;

public class OrderProcessor implements Processor {

    private static final Logger log = LoggerFactory.getLogger(OrderProcessor.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void process(Exchange exchange) throws Exception {
        String fileName = exchange.getIn().getHeader(Exchange.FILE_NAME, String.class);
        log.info("Processing file: {}", fileName);

        try {
            String jsonBody = exchange.getIn().getBody(String.class);
            log.debug("Raw JSON: {}", jsonBody);

            JsonNode orderNode = objectMapper.readTree(jsonBody);

            validateOrder(orderNode, fileName);

            ObjectNode processedOrder = (ObjectNode) orderNode.deepCopy();
            processedOrder.put("status", "PROCESSED");
            processedOrder.put("processedAt", Instant.now().toString());
            processedOrder.put("originalFile", fileName);

            String result = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(processedOrder);
            exchange.getIn().setBody(result);
            exchange.getIn().setHeader("CamelFileName", "processed-" + fileName);

            log.info("Order {} processed successfully", orderNode.get("orderId").asText());

        } catch (IllegalArgumentException e) {
            log.error("Validation error in file {}: {}", fileName, e.getMessage());
            handleError(exchange, e.getMessage());
        } catch (Exception e) {
            log.error("Error processing file {}: {}", fileName, e.getMessage());
            handleError(exchange, "Processing error: " + e.getMessage());
        }
    }

    private void validateOrder(JsonNode orderNode, String fileName) {
        if (!orderNode.has("orderId") || orderNode.get("orderId").asText().isBlank()) {
            throw new IllegalArgumentException("Missing or empty orderId");
        }

        if (!orderNode.has("customer") || orderNode.get("customer").asText().isBlank()) {
            throw new IllegalArgumentException("Missing or empty customer");
        }

        if (!orderNode.has("total") || orderNode.get("total").asDouble() <= 0) {
            throw new IllegalArgumentException("Missing or invalid total");
        }

        log.debug("Order validation passed for {}", orderNode.get("orderId").asText());
    }

    private void handleError(Exchange exchange, String errorMessage) throws Exception {
        String errorJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(
                objectMapper.createObjectNode()
                        .put("status", "ERROR")
                        .put("errorMessage", errorMessage)
                        .put("processedAt", Instant.now().toString())
        );
        exchange.getIn().setBody(errorJson);
        exchange.setProperty("CamelFileExist", "Override");
    }
}
