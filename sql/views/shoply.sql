-- Tables
-- | id | name          | email                                         | join\_date |
-- | -- | ------------- | --------------------------------------------- | ---------- |
-- | 1  | Alice Smith   | [alice@email.com](mailto:alice@email.com)     | 2023-01-05 |
-- | 2  | Bob Johnson   | [bob@email.com](mailto:bob@email.com)         | 2023-03-12 |
-- | 3  | Charlie Brown | [charlie@email.com](mailto:charlie@email.com) | 2023-07-20 |
--
-- | id | name         | category    | price   |
-- | -- | ------------ | ----------- | ------- |
-- | 1  | Laptop       | Electronics | 1200.00 |
-- | 2  | Headphones   | Electronics | 150.00  |
-- | 3  | Coffee Maker | Kitchen     | 80.00   |
--
-- | id | customer\_id | product\_id | quantity | order\_date |
-- | -- | ------------ | ----------- | -------- | ----------- |
-- | 1  | 1            | 1           | 1        | 2023-05-10  |
-- | 2  | 1            | 2           | 2        | 2023-05-10  |
-- | 3  | 2            | 3           | 1        | 2023-06-15  |
-- | 4  | 3            | 1           | 1        | 2023-08-01  |

CREATE VIEW order_details AS
SELECT o.id AS order_id,
       c.name AS customer_name,
       c.email AS customer_email,
       p.name AS product_name,
       p.category,
       p.price,
       o.quantity,
       (p.price * o.quantity) AS total_price,
       o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id;

SELECT * FROM order_details
WHERE category = 'Electronics';

CREATE VIEW monthly_sales_summary AS
SELECT DATE_FORMAT(o.order_date, '%Y-%m') AS month,
       SUM(p.price * o.quantity) AS total_revenue,
       COUNT(DISTINCT o.customer_id) AS unique_customers,
       COUNT(o.id) AS total_orders
FROM orders o
JOIN products p ON o.product_id = p.id
GROUP BY DATE_FORMAT(o.order_date, '%Y-%m')
ORDER BY month;

SELECT * FROM monthly_sales_summary;

CREATE VIEW top_customers AS
SELECT c.id AS customer_id,
       c.name,
       SUM(p.price * o.quantity) AS total_spent,
       COUNT(o.id) AS total_orders
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN products p ON o.product_id = p.id
GROUP BY c.id, c.name
ORDER BY total_spent DESC;

SELECT * FROM top_customers
LIMIT 5;

CREATE VIEW electronics_sales AS
SELECT * 
FROM order_details
WHERE category = 'Electronics';

SELECT customer_name, total_price
FROM electronics_sales
ORDER BY total_price DESC;

