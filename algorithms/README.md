# Algorithms

Repository to store my implementations of algorithms

## Sweep line

Sweep line simulates moving a line across a coordinate system and processing events in sorted order.

Instead of checking every pair of elements (O(n2)):

1. Convert the problem into events
2. Sort events
3. Maintain active state in data structure

Typical Data Structure used:

- Priority Queue
- Balanced BST
- Segment Tree
- Ordered Set
- Counter / Map

## Dynamic programming

DP is about breaking problems into overlapping subproblems and caching results.

The main question:
> What state completely describes the subproblem?

**DP Core Structure:** 

- State, smalledt unit of decision
- Transition, relation between states
- Base case, smallest problem
