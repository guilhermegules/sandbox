CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	name VARCHAR,
	description VARCHAR,
	price DECIMAL,
	quantity INTEGER
)

INSERT INTO products (name, description, price, quantity) 
VALUES 
('Camiseta', 'Preta', 19, 10),
('Fone', 'Muito bom', 99, 5);