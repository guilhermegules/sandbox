package com.example.guava.cache;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class GuavaCacheService {

    private final AtomicInteger databaseFetchCount = new AtomicInteger(0);
    private final LoadingCache<String, String> userProfileCache;

    public GuavaCacheService(long maxSize, long expireAfterWriteSeconds) {
        this.userProfileCache = CacheBuilder.newBuilder()
                .maximumSize(maxSize)
                .expireAfterWrite(expireAfterWriteSeconds, TimeUnit.SECONDS)
                .recordStats()
                .build(new CacheLoader<>() {
                    @Override
                    public String load(String userId) {
                        // Simulating expensive database read
                        databaseFetchCount.incrementAndGet();
                        return "Profile[ID=" + userId + ", Name=User_" + userId + "]";
                    }
                });
    }

    public String getUserProfile(String userId) {
        return userProfileCache.getUnchecked(userId);
    }

    public int getDatabaseFetchCount() {
        return databaseFetchCount.get();
    }

    public LoadingCache<String, String> getCache() {
        return userProfileCache;
    }
}
