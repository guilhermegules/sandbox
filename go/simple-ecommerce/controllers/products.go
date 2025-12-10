package controllers

import (
	"log"
	"net/http"
	"strconv"
	"text/template"

	"simple.ecommerce/m/models"
)

var templates = template.Must(template.ParseGlob("templates/*.html"))

func Index(w http.ResponseWriter, r *http.Request) {
	products := models.GetAllProducts()

	templates.ExecuteTemplate(w, "index", products)
}

func New(w http.ResponseWriter, r *http.Request) {
	templates.ExecuteTemplate(w, "new", nil)
}

func Insert(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		name := r.FormValue("name")
		description := r.FormValue("description")
		price, err := strconv.ParseFloat(r.FormValue("price"), 64)

		if err != nil {
			log.Println("Price convert error", err)
		}

		quantity, err := strconv.Atoi(r.FormValue("quantity"))

		if err != nil {
			log.Println("Quantity convert error", err)
		}

		models.CreateProduct(name, description, price, quantity)
	}

	http.Redirect(w, r, "/", 301)
}
