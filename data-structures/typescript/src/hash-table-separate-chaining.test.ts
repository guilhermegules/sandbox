import { HashTableSeparateChaining } from "./hash-table-separate-chaining";

describe("HashTableSeparateChaining", () => {
  let table: HashTableSeparateChaining<string, number>;

  beforeEach(() => {
    table = new HashTableSeparateChaining<string, number>();
  });

  it("should initially empty", () => {
    expect(table.size()).toBe(0);
    expect(table.isEmpty()).toBe(true);
    expect(table.keys()).toEqual([]);
    expect(table.values()).toEqual([]);
  });

  it("should insert and retrieve values", () => {
    table.insert("a", 1);
    table.insert("b", 2);
    table.insert("c", 3);

    expect(table.size()).toBe(3);
    expect(table.get("a")).toBe(1);
    expect(table.get("b")).toBe(2);
    expect(table.get("c")).toBe(3);
  });

  it("should returns null for non-existing key", () => {
    expect(table.get("missing")).toBeNull();
  });

  it("should insert updates an existing key and returns old value", () => {
    table.insert("x", 10);
    const old = table.insert("x", 20);

    expect(old).toBe(10);
    expect(table.get("x")).toBe(20);
    expect(table.size()).toBe(1);
  });

  it("should contains the keys inserted in the hash table", () => {
    table.insert("a", 1);
    table.insert("b", 2);

    expect(table.containsKey("a")).toBe(true);
    expect(table.containsKey("b")).toBe(true);
    expect(table.containsKey("c")).toBe(false);
  });

  it("should remove returns removed value", () => {
    table.insert("x", 10);
    table.insert("y", 20);

    expect(table.remove("x")).toBe(10);
    // second call removes nothing
    expect(table.remove("x")).toBeNull();
    expect(table.get("x")).toBeNull();
    expect(table.size()).toBe(1);
  });

  it("should keys returns keys correctly", () => {
    table.insert("a", 1);
    table.insert("b", 2);
    table.insert("c", 3);

    const keys = table.keys();

    expect(keys.length).toBe(3);
    expect(keys.toSorted()).toEqual(["a", "b", "c"]);
  });

  it("should values returns correct values", () => {
    table.insert("a", 1);
    table.insert("b", 2);

    const values = table.values().toSorted();
    expect(values).toEqual([1, 2]);
  });

  it("should clear resets the table", () => {
    table.insert("a", 1);
    table.insert("b", 2);

    table.clear();

    expect(table.size()).toBe(0);
    expect(table.isEmpty()).toBe(true);
    expect(table.keys()).toEqual([]);
  });

  it("should table resizes and maintains entries correctly", () => {
    const many = 50;
    for (let i = 0; i < many; i++) {
      table.insert(`key${i}`, i);
    }

    expect(table.size()).toBe(many);

    for (let i = 0; i < many; i++) {
      expect(table.get(`key${i}`)).toBe(i);
    }
  });

  it("should iterator yields all keys", () => {
    table.insert("a", 1);
    table.insert("b", 2);
    table.insert("c", 3);

    const collected: string[] = [];
    for (const key of table) {
      collected.push(key);
    }

    expect(collected.toSorted()).toEqual(["a", "b", "c"]);
  });

  it("should toString contains key/value pairs", () => {
    table.insert("a", 1);
    table.insert("b", 2);

    const str = table.toString();

    expect(str.includes("a => 1")).toBe(true);
    expect(str.includes("b => 2")).toBe(true);
  });

  it("should throw error when try to construct hash table with capacity less than zero", () => {
    expect(() => {
      new HashTableSeparateChaining(-1);
    }).toThrow("Illegal capacity");
  });

  it("should throw error when try to construct hash table with max load factor invalid", () => {
    expect(() => {
      new HashTableSeparateChaining(1, -1);
    }).toThrow("Illegal loadFactor");

    expect(() => {
      new HashTableSeparateChaining(1, 0);
    }).toThrow("Illegal loadFactor");
  });
});
