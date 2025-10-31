# 🧠 C# Memory Management

This project demonstrates how **memory is managed in C#** under the **.NET runtime (CLR)**.  
It covers key concepts like the **Garbage Collector**, **Stack vs Heap**, and **automatic memory management** during *Managed Execution*.

> 💡 This project is educational it’s meant to help you see how memory management works in .NET, not to represent production patterns.

---

## Overview

The **Common Language Runtime (CLR)** automatically handles:
- Allocation and release of memory
- Garbage collection (GC)
- Stack and Heap memory organization

This demo simulates a simple **Employee Management System** to show:
- How objects are created on the **Heap**
- How references are stored on the **Stack**
- How the **Garbage Collector** frees memory once objects are no longer referenced

## Visual diagram - Stack vs Heap

```txt
Stack (fast, small)                Heap (large, managed)
--------------------               ------------------------
| number = 42        |            | "Hello World" (string) |
| text → (ref) ------|----------> | Employee: Alice        |
| manager → (ref) ---|----------> | Employee: Bob          |
|                    |            | Employee: Charlie      |
--------------------               ------------------------
```

When manager = null, the heap objects are no longer reachable the Garbage Collector frees that memory automatically.

## Key Concepts Learned

| Concept                | Description                                        |
| ---------------------- | -------------------------------------------------- |
| **Managed Execution**  | CLR controls memory, types, and garbage collection |
| **Stack**              | Stores method calls, value types, and references   |
| **Heap**               | Stores objects and reference types                 |
| **Garbage Collector**  | Frees unused memory automatically                  |
| **Finalizer (~Class)** | Runs before an object is destroyed by the GC       |


## References

- [Microsoft Docs – Garbage Collection](https://learn.microsoft.com/en-us/dotnet/standard/garbage-collection/)
- [Microsoft Docs – Stack and Heap](https://learn.microsoft.com/en-us/dotnet/standard/managed-code)
