import { H, Person } from "./hash-function";

describe("H", () => {
  test("should return a number between the set 0..5 to the object person", () => {
    expect(H(new Person("William", 21, "M"))).toBe(2);
    expect(H(new Person("Kate", 19, "F"))).toBe(1);
    expect(H(new Person("Bob", 33, "M"))).toBe(2);
    expect(H(new Person("Rose", 26, "F"))).toBe(4);
  });
});
