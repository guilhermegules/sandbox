package main

import (
	"fmt"
	"time"
)

func consumer(tasks chan int) {
	for n := range tasks {
		fmt.Printf("Worker processing: [%d]\n", n)
		time.Sleep(200 * time.Millisecond)
	}
	fmt.Println("Worker: no more tasks, exiting.")
}

func producer(tasks chan int) {
	for i := 1; i <= 100; i++ {
		fmt.Printf("Producer sending: [%d]\n", i)
		tasks <- i
		time.Sleep(100 * time.Millisecond)
	}

	fmt.Println("Producer finished, closing channel.")
	close(tasks)
}

func main() {
	tasks := make(chan int)

	go consumer(tasks)

	go producer(tasks)

	time.Sleep(60 * time.Second)
	fmt.Println("Main finished.")
}
