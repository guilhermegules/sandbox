package models

import (
	"simple.ecommerce/m/infra/database"
)

type Product struct {
	Name        string
	Description string
	Price       float64
	Quantity    int
}

func GetAllProducts() []Product {
	db := database.ConnectDb()

	allProducts, err := db.Query("SELECT * FROM products")

	if err != nil {
		panic(err.Error())
	}

	product := Product{}
	products := []Product{}

	for allProducts.Next() {
		var id, quantity int
		var name, description string
		var price float64

		err = allProducts.Scan(&id, &name, &description, &price, &quantity)

		if err != nil {
			panic(err.Error())
		}

		product.Name = name
		product.Description = description
		product.Price = price
		product.Quantity = quantity

		products = append(products, product)
	}

	defer db.Close()

	return products
}

func CreateProduct(name string, description string, price float64, quantity int) {
	db := database.ConnectDb()

	insert, err := db.Prepare("INSERT INTO products(name, description, price, quantity) VALUES ($1, $2, $3, $4)")

	if err != nil {
		panic(err.Error())
	}

	insert.Exec(name, description, price, quantity)
	defer db.Close()
}
