package main

import (
	"net/http"

	"simple.ecommerce/m/infra/routes"
)

func main() {
	routes.RegisterRoutes()
	http.ListenAndServe(":8000", nil)
}
