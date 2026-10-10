package com.example.guava.concurrency;

import com.google.common.util.concurrent.*;

import java.util.concurrent.Executors;

public class GuavaConcurrencyService implements AutoCloseable {

    private final ListeningExecutorService executorService;

    public GuavaConcurrencyService() {
        this.executorService = MoreExecutors.listeningDecorator(Executors.newFixedThreadPool(4));
    }

    public ListenableFuture<String> calculateAsync(String input) {
        return executorService.submit(() -> {
            Thread.sleep(50);
            return input.toUpperCase();
        });
    }

    public ListenableFuture<Integer> calculateLengthAsync(String input) {
        ListenableFuture<String> uppercaseFuture = calculateAsync(input);
        return Futures.transform(
                uppercaseFuture,
                String::length,
                executorService
        );
    }

    @Override
    public void close() {
        executorService.shutdown();
    }
}
