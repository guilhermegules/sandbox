package com.example.camel;

import com.example.camel.routes.OrderRoutingRouteBuilder;
import org.apache.camel.RoutesBuilder;
import org.apache.camel.component.mock.MockEndpoint;
import org.apache.camel.test.junit5.CamelTestSupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class CamelValidationTest extends CamelTestSupport {

    @Override
    protected RoutesBuilder createRouteBuilder() {
        return new OrderRoutingRouteBuilder();
    }

    @Test
    @DisplayName("Content-based router should route gold orders to gold endpoint with transformed body")
    void shouldRouteGoldOrders() throws Exception {
        MockEndpoint mockGold = getMockEndpoint("mock:goldOrders");
        MockEndpoint mockStandard = getMockEndpoint("mock:standardOrders");

        mockGold.expectedMessageCount(1);
        mockGold.expectedBodiesReceived("[VIP PRIORITY] iPhone 16 Pro");
        mockStandard.expectedMessageCount(0);

        template.sendBodyAndHeaders("direct:processOrder", "iPhone 16 Pro", Map.of("tier", "gold"));

        mockGold.assertIsSatisfied();
        mockStandard.assertIsSatisfied();
    }

    @Test
    @DisplayName("Content-based router should route non-gold orders to standard endpoint")
    void shouldRouteStandardOrders() throws Exception {
        MockEndpoint mockGold = getMockEndpoint("mock:goldOrders");
        MockEndpoint mockStandard = getMockEndpoint("mock:standardOrders");

        mockGold.expectedMessageCount(0);
        mockStandard.expectedMessageCount(1);
        mockStandard.expectedBodiesReceived("[STANDARD] Earbuds");

        template.sendBodyAndHeaders("direct:processOrder", "Earbuds", Map.of("tier", "silver"));

        mockGold.assertIsSatisfied();
        mockStandard.assertIsSatisfied();
    }

    @Test
    @DisplayName("Splitter EIP should split comma-delimited string into separate messages")
    void shouldSplitBatch() throws Exception {
        MockEndpoint mockSplit = getMockEndpoint("mock:splitItems");
        mockSplit.expectedMessageCount(3);
        mockSplit.expectedBodiesReceived("ProcessedItem:ItemA", "ProcessedItem:ItemB", "ProcessedItem:ItemC");

        template.sendBody("direct:splitBatch", "ItemA,ItemB,ItemC");

        mockSplit.assertIsSatisfied();
    }

    @Test
    @DisplayName("Error handler should catch invalid empty orders and route to mock:errors")
    void shouldHandleExceptionsGracefully() throws Exception {
        MockEndpoint mockErrors = getMockEndpoint("mock:errors");
        mockErrors.expectedMessageCount(1);

        String response = template.requestBody("direct:processOrder", "   ", String.class);

        assertThat(response).contains("ERROR: Order payload cannot be empty");
        mockErrors.assertIsSatisfied();
    }
}
