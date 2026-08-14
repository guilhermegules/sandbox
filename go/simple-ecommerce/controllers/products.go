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

func Delete(w http.ResponseWriter, r *http.Request) {
	productId, err := strconv.Atoi(r.URL.Query().Get("id"))

	if err != nil {
		panic(err.Error())
	}

	models.DeleteProduct(productId)

	http.Redirect(w, r, "/", http.StatusMovedPermanently)
}

func Edit(w http.ResponseWriter, r *http.Request) {
	productId, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		panic(err.Error())
	}
	product := models.GetProduct(productId)
	templates.ExecuteTemplate(w, "edit", product)
}

func Update(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		id, err := strconv.Atoi(r.FormValue("id"))
		if err != nil {
			log.Println("Error converting id to int")
		}

		name := r.FormValue("name")
		description := r.FormValue("description")

		price, err := strconv.ParseFloat(r.FormValue("price"), 64)

		if err != nil {
			log.Println("Error converting price to float 64")
		}

		quantity, err := strconv.Atoi(r.FormValue("quantity"))

		if err != nil {
			log.Println("Error converting quantity to int")
		}

		models.UpdateProduct(id, name, description, price, quantity)
	}

	http.Redirect(w, r, "/", http.StatusMovedPermanently)
}
