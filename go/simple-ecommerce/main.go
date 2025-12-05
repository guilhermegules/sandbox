package main

import (
	"database/sql"
	"net/http"
	"text/template"

	_ "github.com/lib/pq"
)

func connectDb() *sql.DB {
	connection := "user=admin dbname=go_ecommerce password=admin host=db sslmode=disable"
	db, err := sql.Open("postgres", connection)

	if err != nil {
		panic(err.Error())
	}

	return db
}

type Product struct {
	Name        string
	Description string
	Price       float64
	Quantity    int
}

var templates = template.Must(template.ParseGlob("templates/*.html"))

func main() {
	db := connectDb()
	defer db.Close()
	http.HandleFunc("/", index)
	http.ListenAndServe(":8000", nil)
}

func index(w http.ResponseWriter, r *http.Request) {
	products := []Product{
		{Name: "T shirt", Description: "Blue", Price: 39, Quantity: 5},
		{"Snicker", "Comfortable", 199, 3},
		{"Headphone", "Good", 89, 2},
	}
	templates.ExecuteTemplate(w, "index", products)
}
