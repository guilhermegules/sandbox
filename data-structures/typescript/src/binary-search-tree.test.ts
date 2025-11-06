import { BinarySearchTree, TreeTraversalOrder } from "./binary-search-tree";

describe("BinarySearchTree", () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    bst = new BinarySearchTree<number>();
  });

  test("should start empty", () => {
    expect(bst.isEmpty()).toBe(true);
    expect(bst.size()).toBe(0);
  });

  test("should add elements and increase size", () => {
    expect(bst.add(10)).toBe(true);
    expect(bst.add(5)).toBe(true);
    expect(bst.add(15)).toBe(true);

    expect(bst.size()).toBe(3);
    expect(bst.isEmpty()).toBe(false);
  });

  test("should not add duplicates", () => {
    bst.add(10);
    expect(bst.add(10)).toBe(false);
    expect(bst.size()).toBe(1);
  });

  test("should correctly check for containment", () => {
    bst.add(10);
    bst.add(5);
    bst.add(15);

    expect(bst.contains(10)).toBe(true);
    expect(bst.contains(5)).toBe(true);
    expect(bst.contains(15)).toBe(true);
    expect(bst.contains(20)).toBe(false);
  });

  // --- REMOVAL TESTS ---

  test("should remove elements correctly (leaf nodes)", () => {
    bst.add(10);
    bst.add(5);
    bst.add(15);

    expect(bst.remove(5)).toBe(true);
    expect(bst.contains(5)).toBe(false);
    expect(bst.size()).toBe(2);
  });

  test("should remove elements with one child", () => {
    bst.add(10);
    bst.add(5);
    bst.add(2);

    expect(bst.remove(5)).toBe(true);
    expect(bst.contains(5)).toBe(false);
    expect(bst.contains(2)).toBe(true);
    expect(bst.size()).toBe(2);
  });

  test("should remove elements with two children", () => {
    bst.add(10);
    bst.add(5);
    bst.add(15);
    bst.add(12);
    bst.add(18);

    expect(bst.remove(15)).toBe(true);
    expect(bst.contains(15)).toBe(false);
    expect(bst.size()).toBe(4);
  });

  test("should return false when removing non-existent element", () => {
    bst.add(10);
    expect(bst.remove(99)).toBe(false);
  });

  test("should compute correct height", () => {
    expect(bst.height()).toBe(0);

    bst.add(10);
    expect(bst.height()).toBe(1);

    bst.add(5);
    bst.add(15);
    expect(bst.height()).toBe(2);

    bst.add(2);
    bst.add(1);
    expect(bst.height()).toBe(4);
  });

  describe("Tree Traversals", () => {
    beforeEach(() => {
      // Build this tree:
      //        8
      //       / \
      //      3   10
      //     / \    \
      //    1   6    14
      //       / \   /
      //      4   7 13

      [8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((n) => bst.add(n));
    });

    test("should in-order traversal should visit nodes in ascending order", () => {
      const result = [...bst.traverse(TreeTraversalOrder.IN_ORDER)];
      expect(result).toEqual([1, 3, 4, 6, 7, 8, 10, 13, 14]);
    });

    test("should pre-order traversal should visit root before subtrees", () => {
      const result = [...bst.traverse(TreeTraversalOrder.PRE_ORDER)];
      expect(result).toEqual([8, 3, 1, 6, 4, 7, 10, 14, 13]);
    });

    test("should post-order traversal should visit root last", () => {
      const result = [...bst.traverse(TreeTraversalOrder.POST_ORDER)];
      expect(result).toEqual([1, 4, 7, 6, 3, 13, 14, 10, 8]);
    });

    test("should level-order traversal should visit nodes by level", () => {
      const result = [...bst.traverse(TreeTraversalOrder.LEVEL_ORDER)];
      expect(result).toEqual([8, 3, 10, 1, 6, 14, 4, 7, 13]);
    });
  });
});
