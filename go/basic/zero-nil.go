package main

import (
	"fmt"
)

func main() {
	// Error use of untyped nil
	// a := nil
	// fmt.Println(a)

	var s *string = nil
	fmt.Println(s)

	var f float64
	var i int

	fmt.Println(f == i)
}
