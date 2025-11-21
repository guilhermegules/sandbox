package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

type Counter interface {
	Increment()
	Value() int64
	Name() string
}

type MutexCounter struct {
	mutex  sync.Mutex
	number int64
}

func (c *MutexCounter) Increment() {
	c.mutex.Lock()
	c.number++
	c.mutex.Unlock()
}

func (c *MutexCounter) Value() int64 {
	c.mutex.Lock()
	v := c.number
	c.mutex.Unlock()
	return v
}

func (c *MutexCounter) Name() string {
	return "MutexCounter"
}

type AtomicCounter struct {
	number int64
}

func (c *AtomicCounter) Increment() {
	atomic.AddInt64(&c.number, 1)
}

func (c *AtomicCounter) Value() int64 {
	return atomic.LoadInt64(&c.number)
}

func (c *AtomicCounter) Name() string {
	return "AtomicCounter"
}

type UnsafeCounter struct {
	number int64
}

func (c *UnsafeCounter) Increment() {
	c.number++ // DATA RACE, ON PURPOSE
}

func (c *UnsafeCounter) Value() int64 {
	return c.number
}

func (c *UnsafeCounter) Name() string {
	return "UnsafeCounter"
}

func runTest(counter Counter, goroutines, increments int) {
	var wg sync.WaitGroup
	wg.Add(goroutines)

	for range goroutines {
		go func() {
			defer wg.Done()
			for range increments {
				counter.Increment()
			}
		}()
	}

	wg.Wait()

	expected := goroutines * increments
	fmt.Printf("[%s] Expected: %d | Got: %d\n",
		counter.Name(), expected, counter.Value())
}

func main() {
	const goroutines = 100
	const increments = 10000

	counters := []Counter{
		&MutexCounter{},
		&AtomicCounter{},
		&UnsafeCounter{},
	}

	for _, c := range counters {
		runTest(c, goroutines, increments)
	}
}
