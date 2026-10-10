package com.example.jdbcvsjpa.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.jdbcvsjpa.domain.ProductPayload;
import com.example.jdbcvsjpa.domain.ProductView;
import com.example.jdbcvsjpa.repository.JdbcProductRepository;
import com.example.jdbcvsjpa.repository.JpaProductRepository;
import com.example.jdbcvsjpa.repository.ProductOperations;

@RestController
@RequestMapping("/api/{impl}")
public class ProductController {

	private final Map<String, ProductOperations> ops;

	public ProductController(JdbcProductRepository jdbc, JpaProductRepository jpa) {
		this.ops = Map.of("jdbc", jdbc, "jpa", jpa);
	}

	@GetMapping("/products")
	public List<ProductView> findAll(@PathVariable String impl) {
		return delegate(impl).findAll();
	}

	@GetMapping("/products/{id}")
	public ProductView findById(@PathVariable String impl, @PathVariable Long id) {
		return delegate(impl).findById(id)
				.orElseThrow(() -> notFound(id));
	}

	@PostMapping("/products")
	public ResponseEntity<ProductView> create(@PathVariable String impl, @RequestBody ProductPayload payload) {
		return ResponseEntity.status(HttpStatus.CREATED).body(delegate(impl).create(payload));
	}

	@PutMapping("/products/{id}")
	public ProductView update(@PathVariable String impl, @PathVariable Long id, @RequestBody ProductPayload payload) {
		return delegate(impl).update(id, payload)
				.orElseThrow(() -> notFound(id));
	}

	@DeleteMapping("/products/{id}")
	public ResponseEntity<Void> delete(@PathVariable String impl, @PathVariable Long id) {
		if (!delegate(impl).delete(id)) {
			throw notFound(id);
		}
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/products/count")
	public long count(@PathVariable String impl) {
		return delegate(impl).count();
	}

	private ProductOperations delegate(String impl) {
		if (impl.equals("jdbc") || impl.equals("jpa")) {
			return ops.get(impl);
		}
		throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "impl must be 'jdbc' or 'jpa'");
	}

	private ResponseStatusException notFound(Long id) {
		return new ResponseStatusException(HttpStatus.NOT_FOUND, "Product " + id + " not found");
	}
}