import { AVLTreeRecursiveOptimized } from "./avl-tree-recursive-optimized";
import { Comparable } from "./avl-tree-recursive";

class NumberValue implements Comparable<NumberValue> {
  constructor(public val: number) {}
  compareTo(other: NumberValue): number {
    return this.val - other.val;
  }
}

describe("AVLTreeRecursiveOptimized", () => {
  let tree: AVLTreeRecursiveOptimized<NumberValue>;

  beforeEach(() => {
    tree = new AVLTreeRecursiveOptimized<NumberValue>();
  });

  it("should not increment size on duplicate insertion", () => {
    tree.insert(new NumberValue(10));
    const firstResult = tree.insert(new NumberValue(10));
    expect(firstResult).toBe(false);
    expect(tree.size()).toBe(1);
  });

  it("should return false when removing non-existent element", () => {
    tree.insert(new NumberValue(10));
    const result = tree.remove(new NumberValue(20));
    expect(result).toBe(false);
    expect(tree.size()).toBe(1);
  });

  it("complex balancing (Left-Right Case)", () => {
    // 30 -> 10 -> 20 (Left heavy, then right heavy child)
    tree.insert(new NumberValue(30));
    tree.insert(new NumberValue(10));
    tree.insert(new NumberValue(20));

    expect(tree.validateBSTInvariant()).toBe(true);
    expect(tree.height()).toBe(1);
    const result = Array.from(tree).map((n) => n.val);
    expect(result).toEqual([10, 20, 30]);
  });

  it("should handle massive insertions", () => {
    for (let i = 0; i < 100; i++) {
      tree.insert(new NumberValue(i));
    }
    expect(tree.size()).toBe(100);
    expect(tree.height()).toBeLessThan(8); // log2(100) is ~6.64, AVL max is ~1.44 * log2(n)
    expect(tree.validateBSTInvariant()).toBe(true);
  });
});
