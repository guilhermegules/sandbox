# Concurrent counter - sync.Mutex vs sync/atomic

You create several goroutines that increment a shared counter. If you don’t synchronize access, you'll get race conditions and the final number will be wrong.

## Problem Summary

Multiple goroutines increment the same counter N times. We want the final value to be exactly goroutines * incrementsPerG.

Without synchronization → race condition → wrong result.

## mutex-couter.go

- `mu.Lock()` ensures only one goroutine updates the counter at a time.
- Correct for any complex critical sections.
- **Lock/unlock adds overhead, especially in highly concurrent scenarios.**

## atomic-counter.go

- `atomic.AddInt64` performs a CPU-level atomic increment (very fast).
- No locking, no blocking.
- Perfect for simple counters and flags.
- Not good for multi-step operations (then must use a mutex).

## Best Practices & Pitfalls

- Use Mutex when:
  - You have multiple related values to update atomically.
  - You have complex critical sections.
- Use Atomic when:
  - You only need to increment/decrement a number.
  - You need very fast, low-level synchronization.
- Never mix mutex and atomic on the same variable.
- Atomic only guarantees correctness if all accesses are atomic.
