package com.example.jdbcvsjpa.repository;

import java.util.List;
import java.util.Optional;

import com.example.jdbcvsjpa.domain.ProductPayload;
import com.example.jdbcvsjpa.domain.ProductView;

public interface ProductOperations {

	List<ProductView> findAll();

	Optional<ProductView> findById(Long id);

	ProductView create(ProductPayload payload);

	Optional<ProductView> update(Long id, ProductPayload payload);

	boolean delete(Long id);

	long count();

	List<Long> ids();
}