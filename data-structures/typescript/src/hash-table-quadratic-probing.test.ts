import { HashTableQuadraticProbing } from "./hash-table-quadratic-probing";

describe("HashTableQuadraticProbing", () => {
  let table: HashTableQuadraticProbing<string, number>;

  beforeEach(() => {
    table = new HashTableQuadraticProbing<string, number>(10);
  });

  it("should start empty", () => {
    expect(table.size()).toBe(0);
    expect(table.isEmpty()).toBe(true);
  });

  it("should insert new items with put()", () => {
    table.put("a", 1);
    expect(table.size()).toBe(1);
    expect(table.get("a")).toBe(1);
  });

  it("should update values when inserting same key", () => {
    table.put("a", 1);
    table.put("a", 99);
    expect(table.size()).toBe(1);
    expect(table.get("a")).toBe(99);
  });

  it("should return null when getting unknown keys", () => {
    expect(table.get("missing")).toBeNull();
  });

  it("should correctly report containsKey()", () => {
    table.put("x", 10);
    expect(table.containsKey("x")).toBe(true);
    expect(table.containsKey("nope")).toBe(false);
  });

  it("should remove values and adjust size", () => {
    table.put("a", 1);
    table.put("b", 2);

    expect(table.remove("a")).toBe(1);
    expect(table.get("a")).toBeNull();
    expect(table.size()).toBe(1);
  });

  it("should return null when removing missing keys", () => {
    expect(table.remove("missing")).toBeNull();
  });

  it("should clear all entries with clear()", () => {
    table.put("a", 1);
    table.put("b", 2);

    table.clear();

    expect(table.size()).toBe(0);
    expect(table.isEmpty()).toBe(true);
    expect(table.get("a")).toBeNull();
  });

  it("should resolve collisions using quadratic probing", () => {
    // Often collide in typical hash functions
    const k1 = "Aa";
    const k2 = "BB";

    table.put(k1, 100);
    table.put(k2, 200);

    expect(table.get(k1)).toBe(100);
    expect(table.get(k2)).toBe(200);
    expect(table.size()).toBe(2);
  });

  it("should rehash when the load factor threshold is exceeded", () => {
    const capacity = 5;
    const t = new HashTableQuadraticProbing<string, number>(capacity);

    t.put("a", 1);
    t.put("b", 2);
    t.put("c", 3);
    t.put("d", 4);

    expect(t.size()).toBe(4);
    expect(t.get("a")).toBe(1);
    expect(t.get("b")).toBe(2);
    expect(t.get("c")).toBe(3);
    expect(t.get("d")).toBe(4);
  });

  it("should overwrite values even after collisions", () => {
    const k1 = "Aa";
    const k2 = "BB";

    table.put(k1, 10);
    table.put(k2, 20);
    table.put(k2, 99);

    expect(table.get(k2)).toBe(99);
    expect(table.size()).toBe(2);
  });
});
