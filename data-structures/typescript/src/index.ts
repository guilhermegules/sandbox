import { CustomArray } from "./array";

const customArray = new CustomArray<number>(10);

[1, 2, 3, 4, 5, 6].forEach((number) => {
  customArray.add(number);
});

console.log(customArray);
console.log(customArray.get(0));

customArray.removeAt(0);

console.log(customArray);
console.log(customArray.size());
