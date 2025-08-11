package main

import "fmt"

type Rect struct {
    width, height int
}

func (r *Rect) area() int {
    return r.width * r.height
}

func (r Rect) perim() int {
    return 2*r.width + 2*r.height
}

func (r *Rect) ratio() int {
	return r.width + r.height / r.width 
}

func main() {
    r := Rect{width: 10, height: 5}

    fmt.Println("area: ", r.area())
    fmt.Println("perim:", r.perim())

    rp := &r
    fmt.Println("area: ", rp.area())
    fmt.Println("perim:", rp.perim())
	fmt.Println("ratio:", rp.ratio())
}