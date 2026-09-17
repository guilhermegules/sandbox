package com.example.jdbcvsjpa.runner;

import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class SeedDataRunner implements CommandLineRunner {

	private final JdbcTemplate jdbc;
	private final int targetCount;
	private final int batchSize;

	public SeedDataRunner(JdbcTemplate jdbc,
			@Value("${app.seed.target-count:2000}") int targetCount,
			@Value("${app.seed.batch-size:500}") int batchSize) {
		this.jdbc = jdbc;
		this.targetCount = targetCount;
		this.batchSize = batchSize;
	}

	@Override
	public void run(String... args) {
		long existing = count();
		long missing = Math.max(0, targetCount - existing);
		if (missing == 0) {
			System.out.printf("[seed] table already has %d rows (target %d), skipping%n", existing, targetCount);
			return;
		}

		long start = System.nanoTime();
		int inserted = 0;
		for (long batchStart = existing + 1; inserted < missing; batchStart += batchSize) {
			int size = (int) Math.min(batchSize, missing - inserted);
			List<Long> localIds = new ArrayList<>(size);
			for (int i = 0; i < size; i++) {
				localIds.add((long) i);
			}
			final long batchStartOffset = batchStart;
			jdbc.batchUpdate(
					"INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
					localIds,
					batchSize,
					(ps, offset) -> {
						long n = batchStartOffset + offset;
						ps.setString(1, "Product " + n);
						ps.setBigDecimal(2, java.math.BigDecimal.valueOf(ThreadLocalRandom.current().nextDouble(1, 1000) * 100).setScale(2, RoundingMode.HALF_UP));
						ps.setInt(3, ThreadLocalRandom.current().nextInt(0, 500));
					});
			inserted += size;
		}
		double elapsedMs = (System.nanoTime() - start) / 1_000_000.0;
		System.out.printf("[seed] inserted %d rows in %.0f ms (via JdbcTemplate batch)%n", inserted, elapsedMs);
	}

	private long count() {
		Long count = jdbc.queryForObject("SELECT COUNT(*) FROM products", Long.class);
		return count == null ? 0 : count;
	}
}