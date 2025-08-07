package main

import "fmt"

func sum(numbers ...int) {
	fmt.Print(numbers, " ")
	total := 0

	for _, number := range numbers {
		total += number
	}

	fmt.Println(total)
}

func main() {
	sum(1, 2)

	sum(3, 2, 1)

	numbers := []int{1, 2, 3, 4}
	sum(numbers...)
}
