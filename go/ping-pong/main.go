package main

import (
	"fmt"
	"time"
)

func ping(ch chan string) {
	for {
		ch <- "ping"
		fmt.Println("Ping send")
		time.Sleep(500 * time.Millisecond)
	}
}

func pong(ch chan string) {
	for {
		msg := <-ch
		fmt.Println("Pong received " + msg)
		ch <- "Pong"
		time.Sleep(500 * time.Millisecond)
	}
}

func main() {
	ch := make(chan string)

	go ping(ch)
	go pong(ch)

	for range 5 {
		msg := <-ch
		fmt.Println(msg)
	}
}
