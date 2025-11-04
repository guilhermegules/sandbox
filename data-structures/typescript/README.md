# TypeScript

> Implementing data structures with TypeScript

- [Data Structures From William Fiset](https://github.com/williamfiset/DEPRECATED-data-structures/tree/master)

## Resume

| Array                                                                    | Linked List                                                             |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Size of array is fixed                                                   | Size of a list is not fixed                                             |
| Memory is allocated from stack                                           | Memory is allocated from heap                                           |
| It is necessary to specify the number of elements during the declaration | It's not necessary to specify the number of elements during declaration |
| It occupies less memory thant linked list                                | Occupies more memory                                                    |

| Stack                                                        | Queue                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Follows **LIFO** (Last In, First Out) order                  | Follows **FIFO** (First In, First Out) order                 |
| Insertion and deletion happen at the **same end** (top)      | Insertion happens at **rear**, deletion happens at **front** |
| Example operations: `push()`, `pop()`                        | Example operations: `enqueue()`, `dequeue()`                 |
| Used in function calls, undo features, expression evaluation | Used in scheduling, buffering, and task management           |

| Queue                                          | Deque (Double-Ended Queue)                             |
| ---------------------------------------------- | ------------------------------------------------------ |
| Insertion at rear and deletion at front only   | Insertion and deletion allowed at **both ends**        |
| Supports only one type of removal and addition | More flexible — can act as both **stack and queue**    |
| Easier to implement, simpler structure         | Slightly more complex implementation                   |
| Examples: task scheduling, printer queue       | Examples: palindrome checking, sliding window problems |

| Stack Memory                              | Heap Memory                                                   |
| ----------------------------------------- | ------------------------------------------------------------- |
| Memory is allocated **automatically**     | Memory is allocated **manually or dynamically**               |
| Size is usually **limited and fixed**     | Size can grow or shrink dynamically                           |
| Stores local variables and function calls | Stores dynamically allocated data (e.g., via `new`, `malloc`) |
| Faster access                             | Slower access due to fragmentation and management overhead    |

| Tree                                                         | Graph                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------- |
| A **hierarchical** structure with parent-child relationships | A **network** structure — connections can be in any direction |
| Has **one root** and no cycles                               | Can have **multiple roots** and **cycles**                    |
| Example: binary tree, BST, AVL tree                          | Example: social networks, road maps                           |
| Edges are **directed from parent to child**                  | Edges can be **directed or undirected**                       |

| Binary Tree                              | Binary Search Tree (BST)                         |
| ---------------------------------------- | ------------------------------------------------ |
| Each node has at most two children       | Each node follows: left < root < right           |
| No specific ordering among nodes         | Maintains **sorted order**                       |
| Used for general hierarchical structures | Used for **fast searching, insertion, deletion** |
| Example: expression tree                 | Example: database indexing                       |

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

### Adding elements to binary heap

Priority queues are usually implemented with heaps since this gives them the best time complexity

The PQ is an **Abstract Data Type** hence heaps are not the only way to implement PQs. As an example. we could use an unsorted list, but this would not gibe us the best possible time complexity

There are many types of heaps we could use to implement a priority queue including:

- Binary Heap
- Fibonacci Heap
- Binomial Heap
- Pairing Heap

A **binary heap** is a **binary tree** that supports the **heap invariant**. In a binary tree every node has exactly two children.

### Removing elements from binary heap

- poll() - remove the root node and rebalance the tree to follow the invariant
- remove() - remove the passed node, swapping the passed node with the last node in the tree looking for the last node in the right, and rebalance the tree to follow the invariant
- Polling - O(log(n))
- Removing - O(n)

### Removing elements from binary heap in O(log(n))

The inefficiency of the removal algorithm comes from the fact that we have to perform a linear search to find out where an element is indexed at. What if instead we did a lookup using a Hashtable to find out where a node is indexed at?

A hashtable provides a constant time lookup and update for a mapping from key (node value) to value (the index).

**Caveat:** what if there are two or more nodes with the same value? What problems would that cause?

#### Dealing with the multiple value problem:

Instead of mapping one value to one position we will mape one value to multiple positions. We can maintain a **Set** or **Tree Set** of indexes for which a particular node value (key) maps to.

![](./docs/index-tree.png)

**Question:** If we want to remove a repeated node in our heap, which node do we remove and does it matter which one we pick?

**Answer:** No it doesn't matter which node we remove as long as we satisfy the heap invariant in the end.

## Union Find (Disjoint Set)

**Union Find** is a data structure that keeps track of elements which are split into one or more disjoint sets.

Its has two primary operations: **find** and **union**.

### Magnets example

![](./docs/union-find-magnets-example.png)

### When and where is a union find used?

- Kruskal's minimum spanning tree algorithm
- Grid percolation
- Network connectivity
- Least common ancestor in trees
- Image processing

### Complexity

| Operation          | Complexity |
| ------------------ | ---------- |
| Construction       | O(n)       |
| Union              | a(n)       |
| Find               | a(n)       |
| Get component size | a(n)       |
| Check if connected | a(n)       |
| Count components   | O(1)       |

> a(n) - Amortized constant time

### Union Find application: Kruskal's minimum spanning tree

Given a graph `G = (V, E)` we want to find a **Minimum Spanning Tree** in the graph (it may not be unique). A minimum spanning tree is a subset of the edges which connect all vertices in the graph with the minimal total edge cost.

![](./docs/minimum-spanning-tree.png)

1. Sort edges by ascending edge weight
2. Walk through the sorted edges and look at two nodes the edge belongs to, if the nodes are alredy unified we don't include this edge, otherwise we include it and unify the nodes.
3. The algorithm terminates when every edge has benn processed or call the vertices have been unified

![](./docs/minimum-spanning-tree-first-merge.png)

![](./docs/minimum-spanning-tree-complete.png)

### Creating union find

To begin using union find, first construct a bijection (a mapping) between your objects and the integers in the range (0, n).

> This step is not necessary in general, but will allow us to construct an array based union find.

![](./docs/union-find-creation.png)

![](./docs/union-find-creation-complete.png)

#### Summary

- Find operation -> To **find** which component a particular elements belongs to find the root of that component by following the parent nodes until a self loop is reached (a node who's parent is itself)
- Union operation -> To **unify** two elements find which are the root nodes of each component and if the root nodes are different make one of the root nodes be the parent of the other.

#### Remarks

- In this data structure, we do not "un-union" elements. In general, this would be very inefficient to do since we would have to update all the children of a node.
- The number of components is equal to the number of roots remaining. Also, remark that the number of root nodes never increases.
- Our current version of Union Find does not support the nice a(n) time complexity we want.
- Checking if H and B belong to the same group takes five hops and in the worst case can be more.

### Path Compression Union Find

![](./docs/union-find-path-compression.png)

![](./docs/union-find-path-compression-1.png)

![](./docs/union-find-path-compression-2.png)

![](./docs/union-find-path-compression-3.png)

## Binary Trees and Binary Search Trees (BST)

A tree is an undirected graph which satistfies any of the following definitions

- An acyclic (no cycles) connected graph
- A conected graph with N nodes and N-1 edges
- An graph in which any two vertices are connectred by exactly one path

A **child** is a node extending from another node. A **parent** is the inverse of this.
A **leaf node** is a node with no children. A subtree is a tree entirely contained in another tree.

### What is a binary tree?

A binary tree is a tree for which every node has at most two child nodes.

### What is a Binary Search Tree?

A binary search tree is a binary tree that satisfies the BST invariant: left subtree has smaller elements and right subtree has larger elements.

![](./docs/bst-tree.png)

### When and where are Binary Tree used?

- Binary Search Trees
  - Implementation of map and set ADTs
  - Red Black Trees
  - AVL Trees
  - Splay Trees
  - Etc...
- Used in the implementation of binary heaps
- Syntax trees (used by compiler and calculators)
- Treap - a probabilistic DS (uses a randomized BST)

### Complexity

| Operation | Average   | Worst |
| --------- | --------- | ----- |
| Insert    | O(log(n)) | O(n)  |
| Delete    | O(log(n)) | O(n)  |
| Remove    | O(log(n)) | O(n)  |
| Search    | O(log(n)) | O(n)  |

### Adding elements to a BST

Binary search tree elements must be comparable so that we can order tem inside the tree.

When inserting an element we want to compare its value to the stored in the current node we're considering to decide on one of the following:

- Recurse down left subtree (< case)
- Recurse down right subtree (> case)
- Handle finding a duplicate value (= case)
- Create a new node (found a null leaf)

### Removing elements from BST

1. Find the element we wish to remove (if it exists)
2. Replace the node we want to remove with its successor to main the invariant

#### Remove phase

![](./docs/bst-remove-phase.png)

Case 1: Leaf node

- If the node we wish to remove is a leaf node then we may do without side effect

Case 2 and 3:

- Either the left/right child node is a subtree
- The successor of the node we are trying to remove in these cases will be the root node of the left/right subtree
- It may be the case that you are removing the root node of the BST in which case its immediate child becomes the new root as you would expect

Case 4:

- Node to remove has both a left subtree and right subtree

### Tree Traversals

- Preorder -> Preorder prints before the recursive calls
- Inorder -> Inorder prints between the recursive calls
- Postorder -> Postorder prints after the recursive calls
- Level order traversal -> In a level order traversal we want to print the nodes as they appear one layer at time.
  - Breadth First Search (BFS)
  - To do a BFS we will need to maintain a queue of the nodes left to explore
