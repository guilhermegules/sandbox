# TypeScript

> Implementing data structures with TypeScript

## Linked lists

A linked list is a sequential list of nodes that hold data which point to other nodes also containing data.

- Data -> Data -> Data -> null

### Where are linked lists used

- Used in many List, Queue and Stack implementations
- Greate for creating circular lists
- Can easily model real world objects such as trains
- Terminology
  - Head: First node in a linked list
  - Tail: Last node in a linked list
  - Pointer: Reference to another node
  - Node: An object containing data and pointers

### Singly vs Doubly linked lists

- Singly linked lists only hold a reference to the next node. In the implementation you always maintain a reference to the head to the linked list and a reference to the tail node for quick additions/removals
  - Data -> Data -> Data -> Data ...
- With a doubly linked list each node holds a reference to the next and previous node. In the implementation you always maintain a reference to the head and the tail of the doubly linked list to do quick additions/removals from both ends of your list
  - Data <-> Data <-> Data <-> ...

### Pros and cons Single and Doubly Linked lists

- Single Linked
  - Pros
    - Use less memory
    - Simpler implementation
  - Cons
    - Cannot easily access previous elements
- Doubly linked
  - Pros
    - Can be traversed backwards
  - Cons
    - Takes 2 times more memory

### Complexity Linked Lists

| Operation        | Single Linked | Double Linked |
| ---------------- | ------------- | ------------- |
| Search           | O(n)          | O(n)          |
| Insert at head   | O(1)          | O(1)          |
| Insert at tail   | O(1)          | O(1)          |
| Remove at head   | O(1)          | O(1)          |
| Remove at tail   | O(n)          | O(1)          |
| Remove in middle | O(n)          | O(n)          |

## Stack

### What is a Stack?

A stack is a one-ended linear data structure which models a real world stack by having two primary operations, namely **push** and **pop**.

LIFO - Last In First Out

![alt text](docs/stack.png)

### When and where is a Stack used?

- Used by undo mechanisms in text editors
- Used by compiler syntax checking for matchin brackets and braces
- Can be used to model a pile of book plates
- Used behind the scenes to support recursion by keeping track of previous function calls
- Can be used to do a Depth First Search (DFS) on a graph

### Example - Brackets

Problem: Given a string made of the following brackets: ()[]{}, determine whether the brackets properly match.

- [{}] -> Valid
- (()()) -> Valid
- {] -> Invalid
- [()]))() -> Invalid
- []{}({}) -> Valid

Bracket sequence:

- [[{}]()]
  - [
  - [[
  - [[{
  - [[{} -> Removes {} Matched
  - [[] -> Removes [] Matched
  - [(
  - [() -> Removes () Matched
  - [] -> Removes [] Matched
  - Check if stack is empty
  - Structure is valid

## Queue

### What is a queue?

A queue is a linear data structure which models real world queues by having two primary operations, namely **enqueue** and **dequeue**.

![](./docs/queue.png)

### When and where is a queue used?

- Any waiting line models a queue, for example a lineup at a movie theatre
- Can be used to efficiently keep track of the x most recently added elements
- Web server request management where you want first come first serve
- Breadth first search (BFS) graph transversal

### Complexity

| Operation | Queue |
| --------- | ----- |
| Enqueue   | O(1)  |
| Dequeue   | O(1)  |
| Peeking   | O(1)  |
| Contains  | O(n)  |
| Removal   | O(n)  |
| Is empty  | O(1)  |

### Queue example - BFS

![](./docs/queue-example-bfs.png)

![](./docs/queue-example-bfs-end.png)

### Pseudo code of BFS

```
Let Q be a Queue
Q.enqueue(starting_node)
starting_node.visited = true

While Q is not empty Do
  node = Q.dequeue()

  For neighbour in neighbours(node):
    If neighbour has not been visited:
      neighbour.bisited = true
      Q.enqueue(neighbour)
```

## Priority Queues (PQs)

### What is a priority queue?

- Is a abstract data type that operates similar to a normal queue except that **each element has a certain priority**.
- The priority of the elements in the priority queue determine the order in which elements are removed from the PQ

### What is a Heap?

- A heap is a tree based DS that satisfies the heap invariant, also called heap property: If A is a parent node of B then Ais ordered with respect to B for all nodes A, B in the heap

![alt text](./docs/heap.png)

### Is this a valid heap?

![alt text](./docs/invalid-heap-1.png)

![alt text](./docs/valid-heap-1.png)

![alt text](./docs/valid-heap-2.png)

![alt text](./docs/invalid-heap-2.png)

![alt text](./docs/invalid-heap-3.png)

![alt text](./docs/valid-heap-3.png)

### When and where is a PQ used?

- Used in certain implementations of Dijkstra's Shortest Path algorithm.
- Anytime you need dynamically fetch the "next best" or "next worst" element.
- Used in Huffman coding (which is often used for lossless data compression).
- Best First Search (BFS) algorithms such as A\* use PQs to continuously grab the next most promissing node.
- Used by Miknimum Spanning Tree (MST) algorithms.

### Complexity PQ with binary heap

> \* O(log(n)) is because the is necessary to restore the heap invariant

> \*\* Using hash table to help optimize these operations does take up linear space and also adds some overhead to the binary heap implementation

| Operation                                         | Priority Queue |
| ------------------------------------------------- | -------------- |
| Binary Heap Construction                          | O(n)           |
| Polling\*                                         | O(log(n))      |
| Peeking                                           | O(1)           |
| Adding\*                                          | O(log(n))      |
| Naive Removing                                    | O(n)           |
| Advanced removing with help from a hash table\*\* | O(log(n))      |
| Naive contains                                    | O(n)           |
| Contains check with help of a hash table\*\*      | O(1)           |

### Turning Min PQ into Max PQ

Problem: Often the standard library of most programming languages only provide a min PQ which sorts by smallest elements first.

Since elements in a priority queue are comparable they implement some sort of comparable interface which we can simply negate to achieve a Max heap.
