package com.example.jdbcvsjpa.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.jdbcvsjpa.domain.ProductPayload;
import com.example.jdbcvsjpa.repository.JdbcProductRepository;
import com.example.jdbcvsjpa.repository.JpaProductRepository;
import com.example.jdbcvsjpa.repository.ProductOperations;

@RestController
@RequestMapping("/api/benchmark")
public class BenchmarkController {

	public enum Mode {
		read, write, all
	}

	private final Map<String, ProductOperations> ops;

	public BenchmarkController(JdbcProductRepository jdbc, JpaProductRepository jpa) {
		this.ops = Map.of("jdbc", jdbc, "jpa", jpa);
	}

	@GetMapping("/{impl}")
	public Result runSingle(@PathVariable String impl,
			@RequestParam(name = "ops", defaultValue = "500") int iterations,
			@RequestParam(defaultValue = "all") Mode mode) {
		return measure(delegate(impl), iterations, mode);
	}

	@GetMapping("/summary")
	public Comparison compare(@RequestParam(name = "ops", defaultValue = "500") int iterations,
			@RequestParam(defaultValue = "all") Mode mode) {
		Result jdbc = measure(this.ops.get("jdbc"), iterations, mode);
		Result jpa = measure(this.ops.get("jpa"), iterations, mode);
		double ratio = jdbc.avgMicros() / jpa.avgMicros();
		return new Comparison(jdbc, jpa, ratio);
	}

	private Result measure(ProductOperations impl, int iterations, Mode mode) {
		List<Long> ids = impl.ids();
		if (ids.isEmpty()) {
			throw new IllegalStateException("No data seeded. Seed the table by starting the app first.");
		}
		constantQueryWarmup(impl);

		long start = System.nanoTime();
		for (int i = 0; i < iterations; i++) {
			read(impl, ids);
			if (mode == Mode.write || mode == Mode.all) {
				write(impl);
			}
		}
		long elapsedNanos = System.nanoTime() - start;

		double totalMs = elapsedNanos / 1_000_000.0;
		double avgMicros = totalMs * 1000.0 / iterations;
		return new Result(implOpsName(impl), iterations, mode, totalMs, avgMicros);
	}

	private String implOpsName(ProductOperations impl) {
		return impl instanceof JdbcProductRepository ? "jdbc" : "jpa";
	}

	private void constantQueryWarmup(ProductOperations impl) {
		impl.count();
	}

	private void read(ProductOperations impl, List<Long> ids) {
		Long id = ids.get(ThreadLocalRandom.current().nextInt(ids.size()));
		impl.findById(id);
	}

	private void write(ProductOperations impl) {
		ProductPayload payload = new ProductPayload("bench-" + ThreadLocalRandom.current().nextLong(),
				new java.math.BigDecimal("19.99"), 5);
		impl.findById(impl.create(payload).id()).ifPresent(created -> impl.delete(created.id()));
	}

	private ProductOperations delegate(String impl) {
		if (impl.equals("jdbc") || impl.equals("jpa")) {
			return ops.get(impl);
		}
		throw new IllegalArgumentException("impl must be 'jdbc' or 'jpa'");
	}

	public record Result(String impl, int ops, Mode mode, double totalMs, double avgMicros) {
	}

	public record Comparison(Result jdbc, Result jpa, double jdbcToJpaRatio) {
	}
}