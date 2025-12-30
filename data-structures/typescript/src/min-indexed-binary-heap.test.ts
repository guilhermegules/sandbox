import { MinIndexedBinaryHeap } from "./min-indexed-binary-heap";

describe("MinIndexedBinaryHeap", () => {
  let heap: MinIndexedBinaryHeap<number>;

  beforeEach(() => {
    heap = new MinIndexedBinaryHeap<number>(10, (a, b) => a - b);
  });

  it("should basic insert and poll", () => {
    heap.insert(0, 30);
    heap.insert(1, 10);
    heap.insert(2, 20);

    expect(heap.pollMinValue()).toBe(10);
    expect(heap.pollMinValue()).toBe(20);
    expect(heap.pollMinValue()).toBe(30);
  });

  it("should delete arbitrary key", () => {
    heap.insert(0, 10);
    heap.insert(1, 20);
    heap.insert(2, 30);

    heap.delete(1);

    expect(heap.contains(1)).toBe(false);
    expect(heap.peekMinValue()).toBe(10);
  });

  it("should update reorders heap correctly", () => {
    heap.insert(0, 100);
    heap.insert(1, 50);

    heap.update(0, 10);

    expect(heap.peekMinKeyIndex()).toBe(0);
    expect(heap.peekMinValue()).toBe(10);
  });

  it("should increase and decrease work correctly", () => {
    heap.insert(0, 10);
    heap.insert(1, 20);
    heap.insert(2, 30);

    heap.increase(0, 40);
    expect(heap.peekMinKeyIndex()).toBe(1);

    heap.decrease(2, 5);
    expect(heap.peekMinKeyIndex()).toBe(2);
  });

  it("should binary heap maintains heap property", () => {
    for (let i = 0; i < 10; i++) {
      heap.insert(i, Math.floor(Math.random() * 100));
    }

    expect(heap.isMinHeap()).toBe(true);

    heap.pollMinValue();
    expect(heap.isMinHeap()).toBe(true);
  });
});
