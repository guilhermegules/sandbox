package com.example.jdbcvsjpa.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.jdbcvsjpa.domain.ProductPayload;
import com.example.jdbcvsjpa.domain.ProductView;

/**
 * Plain JDBC data access built on Spring's {@link JdbcTemplate}. Every SQL
 * statement is written by hand, including insert/update/delete. This is the
 * comparison point against {@link ProductDataRepository} (Spring Data JPA).
 */
@Repository
public class JdbcProductRepository implements ProductOperations {

	private static final RowMapper<ProductView> ROW_MAPPER = JdbcProductRepository::mapRow;

	private final JdbcTemplate jdbc;

	public JdbcProductRepository(JdbcTemplate jdbc) {
		this.jdbc = jdbc;
	}

	@Override
	public List<ProductView> findAll() {
		return jdbc.query("SELECT id, name, price, stock FROM products ORDER BY id", ROW_MAPPER);
	}

	@Override
	public Optional<ProductView> findById(Long id) {
		return jdbc.query("SELECT id, name, price, stock FROM products WHERE id = ?", ROW_MAPPER, id)
				.stream()
				.findFirst();
	}

	@Override
	public ProductView create(ProductPayload payload) {
		Long id = jdbc.queryForObject(
				"INSERT INTO products (name, price, stock) VALUES (?, ?, ?) RETURNING id",
				Long.class, payload.name(), payload.price(), payload.stock());
		return jdbc.queryForObject("SELECT id, name, price, stock FROM products WHERE id = ?", ROW_MAPPER, id);
	}

	@Override
	public Optional<ProductView> update(Long id, ProductPayload payload) {
		int updated = jdbc.update(
				"UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?",
				payload.name(), payload.price(), payload.stock(), id);
		return updated == 1 ? findById(id) : Optional.empty();
	}

	@Override
	public boolean delete(Long id) {
		return jdbc.update("DELETE FROM products WHERE id = ?", id) == 1;
	}

	@Override
	public long count() {
		Long count = jdbc.queryForObject("SELECT COUNT(*) FROM products", Long.class);
		return count == null ? 0 : count;
	}

	@Override
	public List<Long> ids() {
		return jdbc.queryForList("SELECT id FROM products ORDER BY id", Long.class);
	}

	private static ProductView mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new ProductView(
				rs.getLong("id"),
				rs.getString("name"),
				rs.getBigDecimal("price"),
				rs.getInt("stock"));
	}
}