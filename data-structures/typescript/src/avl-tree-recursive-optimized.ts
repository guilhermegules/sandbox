import { AVLNode, Comparable } from "./avl-tree-recursive";

export class AVLTreeRecursiveOptimized<T extends Comparable<T>>
  implements Iterable<T>
{
  private root: AVLNode<T> | null = null;
  private nodeCount: number = 0;

  /**
   * Special token used to signal that a node was not found or
   * a duplicate was encountered, avoiding null ambiguity.
   */
  private readonly TOKEN = new AVLNode<unknown>(null);

  public height(): number {
    return this.root === null ? 0 : this.root.height;
  }

  public size(): number {
    return this.nodeCount;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public contains(value: T): boolean {
    let node = this.root;
    while (node !== null) {
      const cmp = value.compareTo(node.value);
      if (cmp < 0) node = node.left;
      else if (cmp > 0) node = node.right;
      else return true;
    }
    return false;
  }

  public insert(value: T): boolean {
    if (value === null) return false;
    const newRoot = this._insert(this.root, value);
    const insertedNode = newRoot !== this.TOKEN;
    if (insertedNode) {
      this.nodeCount++;
      this.root = newRoot as AVLNode<T>;
    }
    return insertedNode;
  }

  private _insert(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (node === null) return new AVLNode(value);

    const cmp = value.compareTo(node.value);

    if (cmp < 0) {
      const newLeftNode = this._insert(node.left, value);
      if (newLeftNode === this.TOKEN) return this.TOKEN as any;
      node.left = newLeftNode;
    } else if (cmp > 0) {
      const newRightNode = this._insert(node.right, value);
      if (newRightNode === this.TOKEN) return this.TOKEN as any;
      node.right = newRightNode;
    } else {
      return this.TOKEN as any;
    }

    this.update(node);
    return this.balance(node);
  }

  private update(node: AVLNode<T>): void {
    const leftNodeHeight = node.left === null ? -1 : node.left.height;
    const rightNodeHeight = node.right === null ? -1 : node.right.height;

    node.height = 1 + Math.max(leftNodeHeight, rightNodeHeight);
    node.bf = rightNodeHeight - leftNodeHeight;
  }

  private balance(node: AVLNode<T>): AVLNode<T> {
    // Left heavy
    if (node.bf === -2) {
      if (node.left!.bf <= 0) {
        return this.leftLeftCase(node);
      } else {
        return this.leftRightCase(node);
      }
    }
    // Right heavy
    else if (node.bf === +2) {
      if (node.right!.bf >= 0) {
        return this.rightRightCase(node);
      } else {
        return this.rightLeftCase(node);
      }
    }
    return node;
  }

  private leftLeftCase(node: AVLNode<T>): AVLNode<T> {
    return this.rightRotation(node);
  }

  private leftRightCase(node: AVLNode<T>): AVLNode<T> {
    node.left = this.leftRotation(node.left!);
    return this.leftLeftCase(node);
  }

  private rightRightCase(node: AVLNode<T>): AVLNode<T> {
    return this.leftRotation(node);
  }

  private rightLeftCase(node: AVLNode<T>): AVLNode<T> {
    node.right = this.rightRotation(node.right!);
    return this.rightRightCase(node);
  }

  private leftRotation(node: AVLNode<T>): AVLNode<T> {
    const newParent = node.right!;
    node.right = newParent.left;
    newParent.left = node;
    this.update(node);
    this.update(newParent);
    return newParent;
  }

  private rightRotation(node: AVLNode<T>): AVLNode<T> {
    const newParent = node.left!;
    node.left = newParent.right;
    newParent.right = node;
    this.update(node);
    this.update(newParent);
    return newParent;
  }

  public remove(elem: T): boolean {
    const newRoot = this._remove(this.root, elem);
    const removedNode = newRoot !== this.TOKEN;

    if (removedNode) {
      this.root = newRoot as AVLNode<T> | null;
      this.nodeCount--;
      return true;
    }
    return false;
  }

  private _remove(node: AVLNode<T> | null, elem: T): AVLNode<T> | null {
    if (node === null) return this.TOKEN as any;

    const cmp = elem.compareTo(node.value);

    if (cmp < 0) {
      const newLeftNode = this._remove(node.left, elem);
      if (newLeftNode === this.TOKEN) return this.TOKEN as any;
      node.left = newLeftNode;
    } else if (cmp > 0) {
      const newRightNode = this._remove(node.right, elem);
      if (newRightNode === this.TOKEN) return this.TOKEN as any;
      node.right = newRightNode;
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        if (node.left.height > node.right.height) {
          const successorValue = this.findMax(node.left);
          node.value = successorValue;
          const replacement = this._remove(node.left, successorValue);
          if (replacement === this.TOKEN) return this.TOKEN as any;
          node.left = replacement;
        } else {
          const successorValue = this.findMin(node.right);
          node.value = successorValue;
          const replacement = this._remove(node.right, successorValue);
          if (replacement === this.TOKEN) return this.TOKEN as any;
          node.right = replacement;
        }
      }
    }

    this.update(node);
    return this.balance(node);
  }

  private findMin(node: AVLNode<T>): T {
    while (node.left !== null) node = node.left;
    return node.value;
  }

  private findMax(node: AVLNode<T>): T {
    while (node.right !== null) node = node.right;
    return node.value;
  }

  /**
   * Implementation of the Iterator protocol using a Generator.
   */
  public *[Symbol.iterator](): Iterator<T> {
    const stack: AVLNode<T>[] = [];
    let trav: AVLNode<T> | null = this.root;

    while (stack.length > 0 || trav !== null) {
      while (trav !== null) {
        stack.push(trav);
        trav = trav.left;
      }

      const node = stack.pop()!;
      yield node.value;
      trav = node.right;
    }
  }

  // Testing helper
  public validateBSTInvariant(node: AVLNode<T> | null = this.root): boolean {
    if (node === null) return true;
    let isValid = true;
    if (node.left !== null)
      isValid = isValid && node.left.value.compareTo(node.value) < 0;
    if (node.right !== null)
      isValid = isValid && node.right.value.compareTo(node.value) > 0;
    return (
      isValid &&
      this.validateBSTInvariant(node.left) &&
      this.validateBSTInvariant(node.right)
    );
  }
}
