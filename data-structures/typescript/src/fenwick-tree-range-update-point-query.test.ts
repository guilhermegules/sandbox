import { FenwickTreeRangeUpdatePointQuery } from "./fenwick-tree-range-update-point-query";

describe("FenwickTreeRangeUpdatePointQuery", () => {
  it("should construct correctly using a 1-based array", () => {
    const values = [0, 5, 2, 7, 1]; // real data: [5,2,7,1]
    const ft = new FenwickTreeRangeUpdatePointQuery(values);

    // Should match original values when no updates have been applied
    expect(ft.get(1)).toBe(5);
    expect(ft.get(2)).toBe(2);
    expect(ft.get(3)).toBe(7);
    expect(ft.get(4)).toBe(1);
  });

  it("should apply a single range update correctly", () => {
    const arr = [0, 5, 2, 7, 1];
    const ft = new FenwickTreeRangeUpdatePointQuery(arr);

    // Update range [2,4] by +3
    ft.updateRange(2, 4, 3);

    // Expected: [5, 5, 10, 4]
    expect(ft.get(1)).toBe(5);
    expect(ft.get(2)).toBe(2 + 3);
    expect(ft.get(3)).toBe(7 + 3);
    expect(ft.get(4)).toBe(1 + 3);
  });

  it("should apply multiple range updates correctly", () => {
    const arr = [0, 1, 1, 1, 1, 1];
    const ft = new FenwickTreeRangeUpdatePointQuery(arr);

    // Apply updates:
    // [1,3] +2
    // [2,5] +1
    ft.updateRange(1, 3, 2); // array: [3,3,3,1,1]
    ft.updateRange(2, 5, 1); // array: [3,4,4,2,2]

    expect(ft.get(1)).toBe(3);
    expect(ft.get(2)).toBe(4);
    expect(ft.get(3)).toBe(4);
    expect(ft.get(4)).toBe(2);
    expect(ft.get(5)).toBe(2);
  });

  it("should support updates on single-element ranges", () => {
    const arr = [0, 10, 20, 30];
    const ft = new FenwickTreeRangeUpdatePointQuery(arr);

    ft.updateRange(2, 2, 5); // only index 2

    expect(ft.get(1)).toBe(10);
    expect(ft.get(2)).toBe(20 + 5);
    expect(ft.get(3)).toBe(30);
  });

  it("should not affect values outside the updated range", () => {
    const arr = [0, 3, 3, 3, 3, 3];
    const ft = new FenwickTreeRangeUpdatePointQuery(arr);

    ft.updateRange(2, 4, 10); // only indexes 2,3,4

    expect(ft.get(1)).toBe(3);
    expect(ft.get(5)).toBe(3);
  });

  it("should handle multiple overlapping updates", () => {
    const arr = [0, 0, 0, 0, 0, 0, 0];
    const ft = new FenwickTreeRangeUpdatePointQuery(arr);

    ft.updateRange(1, 5, 2);
    ft.updateRange(3, 6, 3);
    ft.updateRange(2, 4, -1);

    // Narrate combined ranges:
    // index: 1  2  3  4  5  6
    // base:  0  0  0  0  0  0
    // +2:    2  2  2  2  2  0
    // +3:    0  0  3  3  3  3
    // -1:    0 -1 -1 -1  0  0
    // total: 2  1  4  4  5  3
    expect(ft.get(1)).toBe(2);
    expect(ft.get(2)).toBe(1);
    expect(ft.get(3)).toBe(4);
    expect(ft.get(4)).toBe(4);
    expect(ft.get(5)).toBe(5);
    expect(ft.get(6)).toBe(3);
  });

  it("should match a naive model for random tests", () => {
    const n = 20;
    const initial = [0, ...Array(n).fill(0)];
    const ft = new FenwickTreeRangeUpdatePointQuery(initial);

    // naive model
    const naive = Array(n + 1).fill(0);

    const applyNaive = (l: number, r: number, v: number) => {
      for (let i = l; i <= r; i++) {
        naive[i] += v;
      }
    };

    // Perform 50 random operations
    for (let t = 0; t < 50; t++) {
      const l = 1 + Math.floor(Math.random() * n);
      const r = l + Math.floor(Math.random() * (n - l + 1));
      const v = Math.floor(Math.random() * 20) - 10;

      ft.updateRange(l, r, v);
      applyNaive(l, r, v);

      for (let i = 1; i <= n; i++) {
        expect(ft.get(i)).toBe(naive[i]);
      }
    }
  });
});
