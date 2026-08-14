import { FenwickTreeRangeQueryPointUpdate } from "./fenwick-tree-range-query-point-update";

describe("FenwickTreeRangeQueryPointUpdate", () => {
  it("should construct an empty Fenwick tree with zeros", () => {
    const ft = new FenwickTreeRangeQueryPointUpdate(5);
    for (let i = 1; i <= 5; i++) {
      expect(ft.get(i)).toBe(0);
    }
  });

  it("should construct a Fenwick tree from a 1-based array", () => {
    const values = [0, 1, 2, 3, 4]; // 1-based array
    const ft = new FenwickTreeRangeQueryPointUpdate(values);

    expect(ft.get(1)).toBe(1);
    expect(ft.get(2)).toBe(2);
    expect(ft.get(3)).toBe(3);
    expect(ft.get(4)).toBe(4);
  });

  it("should compute prefix sums correctly", () => {
    const values = [0, 5, 3, 7, 6]; // prefix sums: [5, 8, 15, 21]
    const ft = new FenwickTreeRangeQueryPointUpdate(values);

    expect(ft.sum(1, 1)).toBe(5);
    expect(ft.sum(1, 2)).toBe(8);
    expect(ft.sum(1, 3)).toBe(15);
    expect(ft.sum(1, 4)).toBe(21);
  });

  it("should compute range sums correctly", () => {
    const values = [0, 2, 4, 6, 8]; // array: [2, 4, 6, 8]
    const ft = new FenwickTreeRangeQueryPointUpdate(values);

    expect(ft.sum(1, 1)).toBe(2);
    expect(ft.sum(2, 3)).toBe(10);
    expect(ft.sum(1, 4)).toBe(20);
    expect(ft.sum(3, 4)).toBe(14);
  });

  it("should support point updates using add()", () => {
    const ft = new FenwickTreeRangeQueryPointUpdate(4);

    ft.add(1, 5);
    ft.add(2, 3);
    ft.add(3, 7);
    ft.add(4, 6);

    expect(ft.get(1)).toBe(5);
    expect(ft.get(2)).toBe(3);
    expect(ft.get(3)).toBe(7);
    expect(ft.get(4)).toBe(6);

    expect(ft.sum(1, 4)).toBe(21);
  });

  it("should update a value using set()", () => {
    const ft = new FenwickTreeRangeQueryPointUpdate(4);

    ft.add(1, 5);
    ft.add(2, 3);
    ft.add(3, 7);
    ft.add(4, 6);

    ft.set(3, 10); // change 7 → 10

    expect(ft.get(3)).toBe(10);
    expect(ft.sum(1, 4)).toBe(24); // 5 + 3 + 10 + 6
  });

  it("should throw if right < left in sum()", () => {
    const ft = new FenwickTreeRangeQueryPointUpdate(3);
    expect(() => ft.sum(3, 1)).toThrow();
  });

  it("should handle multiple updates and queries", () => {
    const ft = new FenwickTreeRangeQueryPointUpdate(10);

    // apply updates
    for (let i = 1; i <= 10; i++) {
      ft.add(i, i); // add value = index
    }

    // the array should now be [1,2,3,4,5,6,7,8,9,10]
    expect(ft.sum(1, 10)).toBe(55);
    expect(ft.sum(4, 7)).toBe(4 + 5 + 6 + 7); // 22
    expect(ft.get(5)).toBe(5);

    ft.set(5, 20); // update index 5 from 5 → 20

    expect(ft.get(5)).toBe(20);
    expect(ft.sum(1, 10)).toBe(55 - 5 + 20); // 70
  });
});
