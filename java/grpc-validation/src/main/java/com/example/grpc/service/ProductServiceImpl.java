package com.example.grpc.service;

import com.example.grpc.proto.ProductFilterRequest;
import com.example.grpc.proto.ProductLookupRequest;
import com.example.grpc.proto.ProductResponse;
import com.example.grpc.proto.ProductServiceGrpc;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ProductServiceImpl extends ProductServiceGrpc.ProductServiceImplBase {

    private final Map<String, ProductResponse> productCatalog = new ConcurrentHashMap<>();

    public ProductServiceImpl() {
        // Seed catalog
        addProduct("PRD-101", "Mechanical Keyboard", "electronics", 129.99);
        addProduct("PRD-102", "Ergonomic Mouse", "electronics", 79.50);
        addProduct("PRD-103", "4K Ultra-Wide Monitor", "electronics", 499.00);
        addProduct("PRD-201", "Standing Desk", "furniture", 350.00);
        addProduct("PRD-202", "Ergonomic Office Chair", "furniture", 280.00);
    }

    private void addProduct(String id, String name, String category, double price) {
        productCatalog.put(id, ProductResponse.newBuilder()
                .setProductId(id)
                .setName(name)
                .setCategory(category)
                .setPrice(price)
                .build());
    }

    @Override
    public void getProduct(ProductLookupRequest request, StreamObserver<ProductResponse> responseObserver) {
        ProductResponse product = productCatalog.get(request.getProductId());
        if (product == null) {
            responseObserver.onError(Status.NOT_FOUND
                    .withDescription("Product with ID " + request.getProductId() + " not found")
                    .asRuntimeException());
            return;
        }
        responseObserver.onNext(product);
        responseObserver.onCompleted();
    }

    @Override
    public void listProducts(ProductFilterRequest request, StreamObserver<ProductResponse> responseObserver) {
        String filterCategory = request.getCategory();
        double maxPrice = request.getMaxPrice();

        for (ProductResponse product : productCatalog.values()) {
            boolean categoryMatch = filterCategory.isEmpty() || product.getCategory().equalsIgnoreCase(filterCategory);
            boolean priceMatch = maxPrice <= 0 || product.getPrice() <= maxPrice;

            if (categoryMatch && priceMatch) {
                responseObserver.onNext(product);
            }
        }
        responseObserver.onCompleted();
    }

    public List<ProductResponse> getAllProducts() {
        return List.copyOf(productCatalog.values());
    }
}
