package main

import "fmt"

func values() (int, int) {
	return 4, 2
}

func main() {
	a, b := values()

	fmt.Println(a)
	fmt.Println(b)

	_, c := values()
	fmt.Println(c)
}
