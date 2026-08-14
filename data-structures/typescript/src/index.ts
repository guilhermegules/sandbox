import { Stack } from "./stack";
import { CustomArray } from "./array";
import "./strings";
import { H, Person } from "./hash-function";

console.log("----ARRAY START----");
const customArray = new CustomArray<number>(10);

[1, 2, 3, 4, 5, 6].forEach((number) => {
  customArray.add(number);
});

console.log(customArray);
console.log(customArray.get(0));

customArray.removeAt(0);

console.log(customArray);
console.log(customArray.size());

console.log("----ARRAY END----");

console.log("----STACK START----");

const stack = new Stack<number>();

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.peek());
console.log(stack.pop());
console.log(stack.peek());

console.log("----STACK END----");

import { PriorityQueue } from "./priority-queue";

console.log("----PRIORITY QUEUE START----");

// Create a new priority queue and add elements
const pq = new PriorityQueue<number>({});

pq.add(5);
pq.add(3);
pq.add(4);
pq.add(1);
pq.add(2);

console.log("Initial priority queue (min-heap order not guaranteed in print):");
console.log(pq);

console.log("Peek (should be 1):", pq.peek());

console.log("Contains 3 (should be true):", pq.contains(3));
console.log("Contains 10 (should be false):", pq.contains(10));

console.log("Remove 3:");
pq.remove(3);
console.log("Contains 3 (should be false):", pq.contains(3));
console.log("Peek (should be 1):", pq.peek());

console.log("Pool (remove root):", pq.pool());
console.log("Peek after pool (should be 2):", pq.peek());

console.log("Size (should be 3):", pq.size());

console.log("Clear queue");
pq.clear();
console.log("Is empty (should be true):", pq.isEmpty());
console.log("Size (should be 0):", pq.size());

console.log("----PRIORITY QUEUE END----");

console.log("----HASH FUNCTION START----");

console.log(H(new Person("William", 21, "M")));
console.log(H(new Person("Kate", 19, "F")));
console.log(H(new Person("Bob", 33, "M")));
console.log(H(new Person("Rose", 26, "F")));

console.log("----HASH FUNCTION END----");
