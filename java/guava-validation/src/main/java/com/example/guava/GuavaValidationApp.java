package com.example.guava;

import com.example.guava.cache.GuavaCacheService;
import com.example.guava.collections.GuavaCollectionsShowcase;
import com.example.guava.concurrency.GuavaConcurrencyService;
import com.google.common.base.Preconditions;
import com.google.common.collect.BiMap;
import com.google.common.collect.Multimap;
import com.google.common.collect.Multiset;
import com.google.common.collect.Table;
import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.MoreExecutors;

import java.util.List;

public class GuavaValidationApp {

    public static void main(String[] args) throws Exception {
        System.out.println("=== Google Guava Validation Showcase ===");

        // 1. Collections
        GuavaCollectionsShowcase collectionsShowcase = new GuavaCollectionsShowcase();
        Multimap<String, String> multimap = collectionsShowcase.demonstrateMultimap();
        System.out.println("\n[1] Multimap (1-to-N without Map<K, List<V>>):");
        multimap.asMap().forEach((k, v) -> System.out.printf("  %s -> %s%n", k, v));

        BiMap<String, String> biMap = collectionsShowcase.demonstrateBiMap();
        System.out.println("\n[2] BiMap (Bi-directional mapping & inverse):");
        System.out.printf("  Lookup key: %s%n", biMap.get("USR-001"));
        System.out.printf("  Lookup value via inverse(): %s%n", biMap.inverse().get("alice@example.com"));

        Table<String, String, Double> table = collectionsShowcase.demonstrateTable();
        System.out.println("\n[3] Table (2D Matrix: Student x Subject):");
        System.out.printf("  Alice's Math score: %.1f%n", table.get("Alice", "Math"));
        System.out.printf("  Math column view: %s%n", table.column("Math"));

        Multiset<String> multiset = collectionsShowcase.demonstrateMultiset(List.of("apple", "banana", "apple", "orange", "apple"));
        System.out.println("\n[4] Multiset (Bag / Count frequency):");
        System.out.printf("  Count of 'apple': %d%n", multiset.count("apple"));

        // 2. Cache
        System.out.println("\n[5] Guava LoadingCache with eviction & stats:");
        GuavaCacheService cacheService = new GuavaCacheService(10, 60);
        System.out.printf("  First call 'U100': %s (DB reads: %d)%n", cacheService.getUserProfile("U100"), cacheService.getDatabaseFetchCount());
        System.out.printf("  Second call 'U100': %s (DB reads: %d)%n", cacheService.getUserProfile("U100"), cacheService.getDatabaseFetchCount());
        System.out.printf("  Cache Hit Rate: %.2f%n", cacheService.getCache().stats().hitRate());

        // 3. Concurrency
        System.out.println("\n[6] Guava ListenableFuture & Futures.transform:");
        try (GuavaConcurrencyService concurrencyService = new GuavaConcurrencyService()) {
            ListenableFuture<Integer> lengthFuture = concurrencyService.calculateLengthAsync("Hello Guava");
            Futures.addCallback(lengthFuture, new FutureCallback<>() {
                @Override
                public void onSuccess(Integer result) {
                    System.out.printf("  Async Future callback succeeded with length: %d%n", result);
                }

                @Override
                public void onFailure(Throwable t) {
                    System.err.printf("  Async Future failed: %s%n", t.getMessage());
                }
            }, MoreExecutors.directExecutor());

            System.out.printf("  Future resolved value: %d%n", lengthFuture.get());
        }

        // 4. Preconditions
        System.out.println("\n[7] Defensive programming with Preconditions:");
        String validName = Preconditions.checkNotNull("ProductionSystem", "Name cannot be null");
        System.out.printf("  Validated: %s%n", validName);
    }
}
