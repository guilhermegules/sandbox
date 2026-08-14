package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"pizzaria/models"

	"github.com/gin-gonic/gin"
)

var pizzas []models.Pizza

func loadPizzas() {
	file, err := os.Open("data/pizza.json")

	if err != nil {
		fmt.Println("Error while opening the file")
		return
	}

	decoder := json.NewDecoder(file)

	if err := decoder.Decode(&pizzas); err != nil {
		fmt.Println("error decoding error")
		return
	}

	defer file.Close()
}

func savePizza() {
	file, err := os.Create("data/pizza.json")

	if err != nil {
		fmt.Println("Error while opening the file")
		return
	}

	defer file.Close()

	encoder := json.NewEncoder(file)

	if err := encoder.Encode(pizzas); err != nil {
		fmt.Println("Error encoding JSON")
		return
	}
}

func getPizzas(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"pizzas": pizzas,
	})
}

func createPizza(c *gin.Context) {
	var newPizza models.Pizza
	if err := c.ShouldBindJSON(&newPizza); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	newPizza.ID = fmt.Sprint(len(pizzas) + 1)
	pizzas = append(pizzas, newPizza)
	savePizza()
	c.JSON(201, gin.H{"pizzas": pizzas})
}

func getPizzaById(c *gin.Context) {
	idParam := c.Param("id")

	for _, pizza := range pizzas {
		if pizza.ID == idParam {
			c.JSON(200, pizza)
			return
		}
	}

	c.JSON(404, gin.H{"error": "Pizza not found."})
}

func main() {
	loadPizzas()

	r := gin.Default()

	r.GET("/pizzas", getPizzas)
	r.POST("/pizzas", createPizza)
	r.GET("/pizzas/:id", getPizzaById)

	r.Run()
}
