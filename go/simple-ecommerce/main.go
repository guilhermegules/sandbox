package main

import (
	"net/http"
	"text/template"
)

type Product struct {
	Name        string
	Description string
	Price       float64
	Quantity    int
}

var templates = template.Must(template.ParseGlob("templates/*.html"))

func main() {
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
