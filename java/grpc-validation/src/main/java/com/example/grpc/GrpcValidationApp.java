package com.example.grpc;

import com.example.grpc.proto.ProductFilterRequest;
import com.example.grpc.proto.ProductLookupRequest;
import com.example.grpc.proto.ProductResponse;
import com.example.grpc.proto.ProductServiceGrpc;
import com.example.grpc.service.ProductServiceImpl;
import io.grpc.ManagedChannel;
import io.grpc.Server;
import io.grpc.inprocess.InProcessChannelBuilder;
import io.grpc.inprocess.InProcessServerBuilder;

import java.util.Iterator;
import java.util.concurrent.TimeUnit;

public class GrpcValidationApp {

    public static void main(String[] args) throws Exception {
        System.out.println("=== Google gRPC Validation Showcase ===");

        String serverName = InProcessServerBuilder.generateName();

        // 1. Build and start In-Process gRPC Server
        Server server = InProcessServerBuilder.forName(serverName)
                .directExecutor()
                .addService(new ProductServiceImpl())
                .build()
                .start();

        System.out.println("[1] gRPC In-Process Server started on channel: " + serverName);

        // 2. Build In-Process gRPC Client Channel & BlockingStub
        ManagedChannel channel = InProcessChannelBuilder.forName(serverName)
                .directExecutor()
                .build();

        ProductServiceGrpc.ProductServiceBlockingStub blockingStub = ProductServiceGrpc.newBlockingStub(channel);

        // 3. Unary Call
        System.out.println("\n[2] Executing Unary RPC (GetProduct: PRD-101)...");
        ProductResponse response = blockingStub.getProduct(ProductLookupRequest.newBuilder()
                .setProductId("PRD-101")
                .build());
        System.out.printf("  Received Unary Response: ID=%s, Name='%s', Price=$%.2f, Category=%s%n",
                response.getProductId(), response.getName(), response.getPrice(), response.getCategory());

        // 4. Server Streaming Call
        System.out.println("\n[3] Executing Server Streaming RPC (ListProducts in category 'electronics' with max_price $200)...");
        Iterator<ProductResponse> streamResponse = blockingStub.listProducts(ProductFilterRequest.newBuilder()
                .setCategory("electronics")
                .setMaxPrice(200.0)
                .build());

        int count = 0;
        while (streamResponse.hasNext()) {
            ProductResponse streamItem = streamResponse.next();
            count++;
            System.out.printf("  Stream Item #%d: [%s] %s ($%.2f)%n",
                    count, streamItem.getProductId(), streamItem.getName(), streamItem.getPrice());
        }

        // 5. Cleanup
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
        server.shutdown().awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("\n[4] gRPC Client channel and Server stopped cleanly.");
        System.out.println("=== Google gRPC Showcase Completed ===");
    }
}
