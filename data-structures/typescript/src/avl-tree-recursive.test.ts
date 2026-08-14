import { AVLTreeRecursive, Comparable } from "./avl-tree-recursive";

class NumberValue implements Comparable<NumberValue> {
  constructor(public val: number) {}
  compareTo(other: NumberValue): number {
    return this.val - other.val;
  }
}

describe("AVLTreeRecursive", () => {
  let tree: AVLTreeRecursive<NumberValue>;

  beforeEach(() => {
    tree = new AVLTreeRecursive<NumberValue>();
  });

  it("should insert values and maintain BST invariant", () => {
    [10, 20, 5, 15, 30].forEach((v) => tree.insert(new NumberValue(v)));
    expect(tree.size()).toBe(5);
    expect(tree.validateBSTInvariant()).toBe(true);
  });

  it("should self-balance (Right-Right Case)", () => {
    // 10 -> 20 -> 30 should trigger a left rotation
    tree.insert(new NumberValue(10));
    tree.insert(new NumberValue(20));
    tree.insert(new NumberValue(30));

    expect(tree.height()).toBe(1); // Root (20) with height 1, children at height 0
    expect(tree.size()).toBe(3);
  });

  it("should return true/false for contains", () => {
    tree.insert(new NumberValue(50));
    expect(tree.contains(new NumberValue(50))).toBe(true);
    expect(tree.contains(new NumberValue(99))).toBe(false);
  });

  it("should remove leaf nodes correctly", () => {
    tree.insert(new NumberValue(10));
    tree.insert(new NumberValue(5));
    tree.remove(new NumberValue(5));
    expect(tree.contains(new NumberValue(5))).toBe(false);
    expect(tree.size()).toBe(1);
  });

  it("should handle removal of node with two children", () => {
    [10, 5, 15, 3, 7].forEach((v) => tree.insert(new NumberValue(v)));
    // Removes 5, should replace with 3 or 7
    expect(tree.remove(new NumberValue(5))).toBe(true);
    expect(tree.validateBSTInvariant()).toBe(true);
    expect(tree.size()).toBe(4);
  });

  it("should be iterable (in-order traversal)", () => {
    const values = [10, 5, 15];
    values.forEach((v) => tree.insert(new NumberValue(v)));
    const result = Array.from(tree).map((n) => n.val);
    expect(result).toEqual([5, 10, 15]);
  });
});
