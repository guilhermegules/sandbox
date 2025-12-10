package routes

import (
	"net/http"

	"simple.ecommerce/m/controllers"
)

func RegisterRoutes() {
	http.HandleFunc("/", controllers.Index)
	http.HandleFunc("/new", controllers.New)
}
