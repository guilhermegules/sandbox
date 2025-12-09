package controllers

import (
	"net/http"
	"text/template"

	"simple.ecommerce/m/models"
)

var templates = template.Must(template.ParseGlob("templates/*.html"))

func Index(w http.ResponseWriter, r *http.Request) {
	products := models.GetAllProducts()

	templates.ExecuteTemplate(w, "index", products)
}
