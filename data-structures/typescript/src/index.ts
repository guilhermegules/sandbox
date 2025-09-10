import { Stack } from "./stack";
import { CustomArray } from "./array";
import "./strings";

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
