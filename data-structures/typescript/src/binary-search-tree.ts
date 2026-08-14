export enum TreeTraversalOrder {
  PRE_ORDER = 0,
  IN_ORDER = 1,
  POST_ORDER = 2,
  LEVEL_ORDER = 3,
}

// Internal Node class
class Node<T> {
  constructor(
    public left: Node<T> | null,
    public right: Node<T> | null,
    public data: T
  ) {}
}

export class BinarySearchTree<T> {
  private nodeCount = 0;
  private root: Node<T> | null = null;

  // Check if the tree is empty
  isEmpty(): boolean {
    return this.size() === 0;
  }

  // Get the number of nodes
  size(): number {
    return this.nodeCount;
  }

  // Add an element to the tree
  add(elem: T): boolean {
    if (this.contains(elem)) {
      return false;
    } else {
      this.root = this._add(this.root, elem);
      this.nodeCount++;
      return true;
    }
  }

  private _add(node: Node<T> | null, elem: T): Node<T> {
    if (node === null) {
      node = new Node(null, null, elem);
    } else {
      if (this.compare(elem, node.data) < 0) {
        node.left = this._add(node.left, elem);
      } else {
        node.right = this._add(node.right, elem);
      }
    }

    return node;
  }

  // Remove an element from the tree
  remove(elem: T): boolean {
    if (this.contains(elem)) {
      this.root = this._remove(this.root, elem);
      this.nodeCount--;
      return true;
    }
    return false;
  }

  private _remove(node: Node<T> | null, elem: T): Node<T> | null {
    if (node === null) return null;

    const cmp = this.compare(elem, node.data);

    if (cmp < 0) {
      node.left = this._remove(node.left, elem);
    } else if (cmp > 0) {
      node.right = this._remove(node.right, elem);
    } else {
      // Node found
      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      const tmp = this.findMin(node.right);
      node.data = tmp.data;
      node.right = this._remove(node.right, tmp.data);
      // If instead we wanted to find the largest node in the left
      // subtree as opposed to smallest node in the right subtree
      // here is what we would do:
      // const tmp = findMax(node.left);
      // node.data = tmp.data;
      // node.left = remove(node.left, tmp.data);
    }

    return node;
  }

  // Helper method to find the leftmost node (which has the smallest value)
  private findMin(node: Node<T>): Node<T> {
    while (node.left !== null) node = node.left;
    return node;
  }

  // Helper method to find the rightmost node (which has the largest value)
  private findMax(node: Node<T>): Node<T> {
    while (node.right !== null) node = node.right;
    return node;
  }

  contains(elem: T): boolean {
    return this.containsNode(this.root, elem);
  }

  private containsNode(node: Node<T> | null, elem: T): boolean {
    // Base case: reached bottom, value not found
    if (node === null) return false;

    const cmp = this.compare(elem, node.data);
    // Dig into the left subtree because the value we're
    // looking for is smaller than the current value
    if (cmp < 0) return this.containsNode(node.left, elem);
    // Dig into the right subtree because the value we're
    // looking for is greater than the current value
    if (cmp > 0) return this.containsNode(node.right, elem);
    // We found the value we were looking for
    return true;
  }

  height(): number {
    return this._height(this.root);
  }

  // Recursive helper method to compute the height of the tree
  private _height(node: Node<T> | null): number {
    if (node === null) return 0;
    return Math.max(this._height(node.left), this._height(node.right)) + 1;
  }

  // This method returns an iterator for a given TreeTraversalOrder.
  // The ways in which you can traverse the tree are in four different ways:
  // preorder, inorder, postorder and levelorder.
  traverse(order: TreeTraversalOrder): IterableIterator<T> {
    switch (order) {
      case TreeTraversalOrder.PRE_ORDER:
        return this.preOrderTraversal();
      case TreeTraversalOrder.IN_ORDER:
        return this.inOrderTraversal();
      case TreeTraversalOrder.POST_ORDER:
        return this.postOrderTraversal();
      case TreeTraversalOrder.LEVEL_ORDER:
        return this.levelOrderTraversal();
      default:
        throw new Error("Invalid traversal order");
    }
  }

  // Returns as iterator to traverse the tree in pre order
  private *preOrderTraversal(): IterableIterator<T> {
    if (!this.root) return;
    const stack: Array<Node<T>> = [this.root];
    while (stack.length > 0) {
      const node = stack.pop()!;
      yield node.data;
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
  }

  // Returns as iterator to traverse the tree in order
  private *inOrderTraversal(): IterableIterator<T> {
    const stack: Array<Node<T>> = [];
    let current = this.root;
    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop()!;
      yield current.data;
      current = current.right;
    }
  }

  // Returns as iterator to traverse the tree in post order
  private *postOrderTraversal(): IterableIterator<T> {
    if (!this.root) return;
    const stack1: Array<Node<T>> = [this.root];
    const stack2: Array<Node<T>> = [];
    while (stack1.length > 0) {
      const node = stack1.pop()!;
      stack2.push(node);
      if (node.left) stack1.push(node.left);
      if (node.right) stack1.push(node.right);
    }
    while (stack2.length > 0) {
      yield stack2.pop()!.data;
    }
  }

  // Returns as iterator to traverse the tree in level order
  private *levelOrderTraversal(): IterableIterator<T> {
    if (!this.root) return;
    const queue: Array<Node<T>> = [this.root];
    while (queue.length > 0) {
      const node = queue.shift()!;
      yield node.data;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // Utility comparison function
  private compare(a: T, b: T): number {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }
}
