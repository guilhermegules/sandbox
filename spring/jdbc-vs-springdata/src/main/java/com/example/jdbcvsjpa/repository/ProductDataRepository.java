package com.example.jdbcvsjpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jdbcvsjpa.domain.Product;

public interface ProductDataRepository extends JpaRepository<Product, Long> {
}