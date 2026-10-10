package com.example.jdbcvsjpa.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.jdbcvsjpa.domain.Product;
import com.example.jdbcvsjpa.domain.ProductPayload;
import com.example.jdbcvsjpa.domain.ProductView;

@Repository
public class JpaProductRepository implements ProductOperations {

	private final ProductDataRepository data;

	public JpaProductRepository(ProductDataRepository data) {
		this.data = data;
	}

	@Override
	public List<ProductView> findAll() {
		return data.findAll().stream().map(Product::toView).toList();
	}

	@Override
	public Optional<ProductView> findById(Long id) {
		return data.findById(id).map(Product::toView);
	}

	@Override
	public ProductView create(ProductPayload payload) {
		return data.save(new Product(payload.name(), payload.price(), payload.stock())).toView();
	}

	@Override
	public Optional<ProductView> update(Long id, ProductPayload payload) {
		return data.findById(id).map(existing -> {
			existing.setName(payload.name());
			existing.setPrice(payload.price());
			existing.setStock(payload.stock());
			return data.save(existing).toView();
		});
	}

	@Override
	public boolean delete(Long id) {
		if (!data.existsById(id)) {
			return false;
		}
		data.deleteById(id);
		return true;
	}

	@Override
	public long count() {
		return data.count();
	}

	@Override
	public List<Long> ids() {
		return data.findAll().stream().map(Product::getId).toList();
	}
}