import { MinIndexedDHeap } from "./min-indexed-d-heap";

describe("MinIndexedDHeap", () => {
  let heap: MinIndexedDHeap<number>;

  beforeEach(() => {
    heap = new MinIndexedDHeap<number>(3, 10, (a, b) => a - b);
  });

  it("should starts empty", () => {
    expect(heap.size()).toBe(0);
    expect(heap.isEmpty()).toBe(true);
  });

  it("should insert and peekMinValue", () => {
    heap.insert(0, 50);
    heap.insert(1, 20);
    heap.insert(2, 30);

    expect(heap.peekMinValue()).toBe(20);
    expect(heap.peekMinKeyIndex()).toBe(1);
  });

  it("should pollMinValue removes elements in order", () => {
    heap.insert(0, 40);
    heap.insert(1, 10);
    heap.insert(2, 30);
    heap.insert(3, 20);

    expect(heap.pollMinValue()).toBe(10);
    expect(heap.pollMinValue()).toBe(20);
    expect(heap.pollMinValue()).toBe(30);
    expect(heap.pollMinValue()).toBe(40);
    expect(heap.isEmpty()).toBe(true);
  });

  it("should contains reflects correct state", () => {
    heap.insert(2, 100);
    expect(heap.contains(2)).toBe(true);
    heap.delete(2);
    expect(heap.contains(2)).toBe(false);
  });

  it("should delete removes specific key", () => {
    heap.insert(0, 50);
    heap.insert(1, 20);
    heap.insert(2, 30);

    const removed = heap.delete(1);
    expect(removed).toBe(20);
    expect(heap.contains(1)).toBe(false);
    expect(heap.peekMinValue()).toBe(30);
  });

  it("should update modifies value and reorders heap", () => {
    heap.insert(0, 50);
    heap.insert(1, 20);

    heap.update(0, 10);

    expect(heap.peekMinKeyIndex()).toBe(0);
    expect(heap.peekMinValue()).toBe(10);
  });

  it("should decrease moves element up", () => {
    heap.insert(0, 50);
    heap.insert(1, 40);
    heap.insert(2, 30);

    heap.decrease(0, 10);

    expect(heap.peekMinKeyIndex()).toBe(0);
    expect(heap.peekMinValue()).toBe(10);
  });

  it("should increase moves element down", () => {
    heap.insert(0, 10);
    heap.insert(1, 20);
    heap.insert(2, 30);

    heap.increase(0, 100);

    expect(heap.peekMinKeyIndex()).toBe(1);
    expect(heap.peekMinValue()).toBe(20);
  });

  it("should valueOf returns correct value", () => {
    heap.insert(3, 99);
    expect(heap.valueOf(3)).toBe(99);
  });

  it("should throws when inserting duplicate key", () => {
    heap.insert(0, 10);
    expect(() => heap.insert(0, 20)).toThrow();
  });

  it("should throws on peek when empty", () => {
    expect(() => heap.peekMinValue()).toThrow();
  });

  it("should maintains min-heap invariant", () => {
    const values = [42, 7, 19, 88, 3, 25];

    values.forEach((v, i) => heap.insert(i, v));

    expect(heap.isMinHeap()).toBe(true);

    heap.pollMinValue();
    expect(heap.isMinHeap()).toBe(true);
  });
});
