package com.example.jdbcvsjpa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jdbcvsjpa.domain.Product;

/**
 * The Spring Data JPA artifact: a repository derived purely from an interface.
 * No SQL is written anywhere; Hibernate translates the method names into SQL.
 */
public interface ProductDataRepository extends JpaRepository<Product, Long> {
}