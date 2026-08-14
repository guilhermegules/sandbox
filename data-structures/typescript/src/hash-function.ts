export class Person {
  constructor(
    public name: string,
    public age: number,
    public gender: "M" | "F"
  ) {}
}

export function H(person: Person) {
  const nameValue = person.name
    .split("")
    .reduce((acc, letter) => acc + letter.charCodeAt(0), 0);

  const genderValue = person.gender === "M" ? 0 : 1;

  // The numbers 7 and 13 don’t have any magical meaning they’re chosen as small prime numbers
  // to help spread out the hash values and reduce collisions.
  const combinedValue = nameValue + person.age * 7 + genderValue * 13;

  // Map to the range {0..5}
  return combinedValue % 6;
}
