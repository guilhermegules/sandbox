package com.example.guava;

import com.example.guava.cache.GuavaCacheService;
import com.example.guava.collections.GuavaCollectionsShowcase;
import com.example.guava.concurrency.GuavaConcurrencyService;
import com.google.common.collect.BiMap;
import com.google.common.collect.Multimap;
import com.google.common.collect.Multiset;
import com.google.common.collect.Table;
import com.google.common.util.concurrent.ListenableFuture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class GuavaValidationTest {

    private final GuavaCollectionsShowcase collectionsShowcase = new GuavaCollectionsShowcase();

    @Test
    @DisplayName("Multimap should collect multiple values under a single key")
    void testMultimap() {
        Multimap<String, String> multimap = collectionsShowcase.demonstrateMultimap();
        assertThat(multimap.get("Engineering")).containsExactly("Alice", "Bob", "Charlie");
        assertThat(multimap.get("Marketing")).containsExactly("Diana", "Evan");
        assertThat(multimap.size()).isEqualTo(5);
    }

    @Test
    @DisplayName("BiMap should maintain bidirectional unique key-value lookup and inverse")
    void testBiMap() {
        BiMap<String, String> biMap = collectionsShowcase.demonstrateBiMap();
        assertThat(biMap.get("USR-001")).isEqualTo("alice@example.com");
        assertThat(biMap.inverse().get("alice@example.com")).isEqualTo("USR-001");

        // Attempting to put duplicate value throws IllegalArgumentException
        assertThatThrownBy(() -> biMap.put("USR-003", "alice@example.com"))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    @DisplayName("Table should allow 2D indexing with row, column and cell views")
    void testTable() {
        Table<String, String, Double> table = collectionsShowcase.demonstrateTable();
        assertThat(table.get("Alice", "Math")).isEqualTo(95.5);
        assertThat(table.row("Alice")).containsEntry("Math", 95.5).containsEntry("Physics", 88.0);
        assertThat(table.column("Math")).containsEntry("Alice", 95.5).containsEntry("Bob", 72.0);
    }

    @Test
    @DisplayName("Multiset should track frequencies accurately")
    void testMultiset() {
        Multiset<String> counts = collectionsShowcase.demonstrateMultiset(List.of("alpha", "beta", "alpha", "gamma", "alpha"));
        assertThat(counts.count("alpha")).isEqualTo(3);
        assertThat(counts.count("beta")).isEqualTo(1);
        assertThat(counts.elementSet()).containsExactlyInAnyOrder("alpha", "beta", "gamma");
    }

    @Test
    @DisplayName("LoadingCache should cache misses and reuse hits with statistics")
    void testLoadingCache() {
        GuavaCacheService cacheService = new GuavaCacheService(5, 10);
        assertThat(cacheService.getDatabaseFetchCount()).isEqualTo(0);

        String profile1 = cacheService.getUserProfile("USR-99");
        assertThat(profile1).contains("USR-99");
        assertThat(cacheService.getDatabaseFetchCount()).isEqualTo(1);

        // Second call hits cache
        String profile2 = cacheService.getUserProfile("USR-99");
        assertThat(profile2).isEqualTo(profile1);
        assertThat(cacheService.getDatabaseFetchCount()).isEqualTo(1); // No new DB read
        assertThat(cacheService.getCache().stats().hitCount()).isEqualTo(1);
    }

    @Test
    @DisplayName("ListenableFuture should transform and resolve asynchronously")
    void testListenableFuture() throws ExecutionException, InterruptedException {
        try (GuavaConcurrencyService concurrency = new GuavaConcurrencyService()) {
            ListenableFuture<Integer> future = concurrency.calculateLengthAsync("Hello Guava");
            assertThat(future.get()).isEqualTo(11);
        }
    }
}
