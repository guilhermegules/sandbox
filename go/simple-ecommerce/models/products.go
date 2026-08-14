package models

import (
	"strconv"

	"simple.ecommerce/m/infra/database"
)

type Product struct {
	Id          int
	Name        string
	Description string
	Price       float64
	Quantity    int
}

func GetAllProducts() []Product {
	db := database.ConnectDb()

	allProducts, err := db.Query("SELECT * FROM products ORDER BY id")

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
		product.Id = id

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

func DeleteProduct(productId int) {
	db := database.ConnectDb()

	delete, err := db.Prepare("DELETE FROM products WHERE id = $1")

	if err != nil {
		panic(err.Error())
	}

	delete.Exec(productId)
	defer db.Close()
}

func GetProduct(productId int) Product {
	db := database.ConnectDb()

	product, err := db.Query("SELECT * FROM products WHERE id = $1", strconv.Itoa(productId))

	if err != nil {
		panic(err.Error())
	}

	productEntity := Product{}

	for product.Next() {
		var id, quantity int
		var name, description string
		var price float64

		err = product.Scan(&id, &name, &description, &price, &quantity)

		if err != nil {
			panic(err.Error())
		}

		productEntity.Id = id
		productEntity.Quantity = quantity
		productEntity.Name = name
		productEntity.Description = description
		productEntity.Price = price
	}

	defer db.Close()

	return productEntity
}

func UpdateProduct(id int, name string, description string, price float64, quantity int) {
	db := database.ConnectDb()

	update, err := db.Prepare("UPDATE products SET name=$1, description=$2, price=$3, quantity=$4 WHERE id = $5")

	if err != nil {
		panic(err.Error())
	}

	update.Exec(name, description, price, quantity, id)

	defer db.Close()
}
