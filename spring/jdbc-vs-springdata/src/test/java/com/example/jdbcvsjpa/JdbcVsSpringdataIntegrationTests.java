package com.example.jdbcvsjpa;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClient;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import com.example.jdbcvsjpa.controller.BenchmarkController;
import com.example.jdbcvsjpa.controller.BenchmarkController.Mode;
import com.example.jdbcvsjpa.domain.ProductPayload;
import com.example.jdbcvsjpa.domain.ProductView;
import com.example.jdbcvsjpa.repository.JdbcProductRepository;
import com.example.jdbcvsjpa.repository.JpaProductRepository;

import tools.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class JdbcVsSpringdataIntegrationTests {

	@Container
	@ServiceConnection
	static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

	@Value("${local.server.port}")
	int port;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	JdbcProductRepository jdbc;

	@Autowired
	JpaProductRepository jpa;

	@Autowired
	BenchmarkController benchmark;

	@Test
	void bothImplementationsServeIdenticalData() {
		List<Long> jdbcIds = jdbc.ids();
		List<Long> jpaIds = jpa.ids();
		assertThat(jdbcIds).isNotEmpty();
		assertThat(jpaIds).containsExactlyElementsOf(jdbcIds);
		assertThat(jdbc.count()).isEqualTo(jpa.count());
	}

	@Test
	void crudBehavesIdentically() throws Exception {
		ProductPayload payload = new ProductPayload("Test Widget", new java.math.BigDecimal("42.50"), 7);

		ProductView jdbcCreated = jdbc.create(payload);
		ProductView jpaCreated = jpa.create(payload);

		assertThat(jpaCreated.name()).isEqualTo(jdbcCreated.name());
		assertThat(jpaCreated.price()).isEqualByComparingTo(jdbcCreated.price());
		assertThat(jpaCreated.stock()).isEqualTo(jdbcCreated.stock());

		ProductPayload updated = new ProductPayload("Test Widget v2", new java.math.BigDecimal("99.99"), 3);
		ProductView jdbcUpdated = jdbc.update(jdbcCreated.id(), updated).orElseThrow();
		ProductView jpaUpdated = jpa.update(jpaCreated.id(), updated).orElseThrow();
		assertThat(jpaUpdated.name()).isEqualTo(jdbcUpdated.name());
		assertThat(jpaUpdated.price()).isEqualByComparingTo(jdbcUpdated.price());
		assertThat(jpaUpdated.stock()).isEqualTo(jdbcUpdated.stock());

		assertThat(jdbc.findById(jdbcCreated.id())).isPresent();
		assertThat(jpa.findById(jpaCreated.id())).isPresent();

		assertThat(jdbc.delete(jdbcCreated.id())).isTrue();
		assertThat(jpa.delete(jpaCreated.id())).isTrue();
		assertThat(jdbc.findById(jdbcCreated.id())).isEmpty();
		assertThat(jpa.findById(jpaCreated.id())).isEmpty();
		assertThat(jdbc.delete(jdbcCreated.id())).isFalse();
		assertThat(jpa.delete(jpaCreated.id())).isFalse();
	}

	@Test
	void httpEndpointsParity() throws Exception {
		RestClient client = RestClient.builder().baseUrl("http://localhost:" + port).build();
		ResponseEntity<String> jdbcBody = client.get().uri("/api/jdbc/products").retrieve().toEntity(String.class);
		ResponseEntity<String> jpaBody = client.get().uri("/api/jpa/products").retrieve().toEntity(String.class);
		assertThat(jdbcBody.getStatusCode().is2xxSuccessful()).isTrue();
		assertThat(jpaBody.getStatusCode().is2xxSuccessful()).isTrue();

		List<Map<String, Object>> jdbcRows = parseRows(jdbcBody.getBody());
		List<Map<String, Object>> jpaRows = parseRows(jpaBody.getBody());
		assertThat(sortById(jdbcRows)).containsExactlyElementsOf(sortById(jpaRows));
	}

	@Test
	void benchmarkRunsBothImplementations() {
		BenchmarkController.Comparison comparison = benchmark.compare(200, Mode.all);
		assertThat(comparison.jdbc().totalMs()).isGreaterThan(0);
		assertThat(comparison.jpa().totalMs()).isGreaterThan(0);
		assertThat(comparison.jdbcToJpaRatio()).isGreaterThan(0);
	}

	private List<Map<String, Object>> parseRows(String json) throws Exception {
		return objectMapper.readValue(json,
				objectMapper.getTypeFactory().constructCollectionType(List.class, Map.class));
	}

	private List<Map<String, Object>> sortById(List<Map<String, Object>> rows) {
		return rows.stream()
				.sorted((a, b) -> Long.compare(((Number) a.get("id")).longValue(), ((Number) b.get("id")).longValue()))
				.collect(Collectors.toList());
	}

	@Test
	void contextLoads() {
		assertThat(objectMapper).isNotNull();
	}
}