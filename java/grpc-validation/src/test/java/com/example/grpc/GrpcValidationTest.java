package com.example.grpc;

import com.example.grpc.interceptor.AuthServerInterceptor;
import com.example.grpc.proto.ProductFilterRequest;
import com.example.grpc.proto.ProductLookupRequest;
import com.example.grpc.proto.ProductResponse;
import com.example.grpc.proto.ProductServiceGrpc;
import com.example.grpc.service.ProductServiceImpl;
import io.grpc.*;
import io.grpc.inprocess.InProcessChannelBuilder;
import io.grpc.inprocess.InProcessServerBuilder;
import io.grpc.stub.MetadataUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class GrpcValidationTest {

    private String serverName;
    private Server server;
    private ManagedChannel channel;
    private ProductServiceGrpc.ProductServiceBlockingStub blockingStub;

    @BeforeEach
    void setUp() throws Exception {
        serverName = InProcessServerBuilder.generateName();

        server = InProcessServerBuilder.forName(serverName)
                .directExecutor()
                .addService(ServerInterceptors.intercept(new ProductServiceImpl(), new AuthServerInterceptor()))
                .build()
                .start();

        channel = InProcessChannelBuilder.forName(serverName)
                .directExecutor()
                .build();

        // Stub with valid auth header attached
        Metadata headers = new Metadata();
        headers.put(AuthServerInterceptor.API_KEY_HEADER, AuthServerInterceptor.VALID_API_KEY);
        blockingStub = ProductServiceGrpc.newBlockingStub(channel)
                .withInterceptors(MetadataUtils.newAttachHeadersInterceptor(headers));
    }

    @AfterEach
    void tearDown() throws Exception {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
        server.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }

    @Test
    @DisplayName("Unary RPC should return exact product details")
    void testUnaryGetProduct() {
        ProductResponse response = blockingStub.getProduct(ProductLookupRequest.newBuilder()
                .setProductId("PRD-101")
                .build());

        assertThat(response.getProductId()).isEqualTo("PRD-101");
        assertThat(response.getName()).isEqualTo("Mechanical Keyboard");
        assertThat(response.getCategory()).isEqualTo("electronics");
    }

    @Test
    @DisplayName("Unary RPC should throw NOT_FOUND for unknown product")
    void testUnaryGetProductNotFound() {
        ProductLookupRequest request = ProductLookupRequest.newBuilder()
                .setProductId("NON-EXISTENT")
                .build();

        assertThatThrownBy(() -> blockingStub.getProduct(request))
                .isInstanceOf(StatusRuntimeException.class)
                .hasMessageContaining("NOT_FOUND");
    }

    @Test
    @DisplayName("Server streaming RPC should yield filtered stream items")
    void testServerStreamingListProducts() {
        ProductFilterRequest request = ProductFilterRequest.newBuilder()
                .setCategory("electronics")
                .setMaxPrice(200.0)
                .build();

        Iterator<ProductResponse> stream = blockingStub.listProducts(request);
        List<ProductResponse> products = new ArrayList<>();
        stream.forEachRemaining(products::add);

        assertThat(products)
                .hasSize(2)
                .extracting(ProductResponse::getProductId)
                .containsExactlyInAnyOrder("PRD-101", "PRD-102");
    }

    @Test
    @DisplayName("Auth interceptor should reject requests missing API key with UNAUTHENTICATED")
    void testAuthInterceptorRejection() {
        // Plain stub without auth header
        ProductServiceGrpc.ProductServiceBlockingStub unauthenticatedStub = ProductServiceGrpc.newBlockingStub(channel);

        ProductLookupRequest request = ProductLookupRequest.newBuilder()
                .setProductId("PRD-101")
                .build();

        assertThatThrownBy(() -> unauthenticatedStub.getProduct(request))
                .isInstanceOf(StatusRuntimeException.class)
                .hasMessageContaining("UNAUTHENTICATED");
    }
}
