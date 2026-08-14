/**
 * An AVL tree implementation in TypeScript.
 * This is a self-balancing binary search tree.
 */

export interface Comparable<T> {
  compareTo(other: T): number;
}

export class AVLNode<T> {
  public bf: number = 0; // Balance Factor
  public value: T;
  public height: number = 0;
  public left: AVLNode<T> | null = null;
  public right: AVLNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class AVLTreeRecursive<T extends Comparable<T>> implements Iterable<T> {
  private root: AVLNode<T> | null = null;
  private nodeCount: number = 0;

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
    return this._contains(this.root, value);
  }

  private _contains(node: AVLNode<T> | null, value: T): boolean {
    if (node === null) return false;
    const cmp = value.compareTo(node.value);

    if (cmp < 0) return this._contains(node.left, value);
    if (cmp > 0) return this._contains(node.right, value);
    return true;
  }

  public insert(value: T): boolean {
    if (value == null) return false;
    if (!this.contains(value)) {
      this.root = this._insert(this.root, value);
      this.nodeCount++;
      return true;
    }
    return false;
  }

  private _insert(node: AVLNode<T> | null, value: T): AVLNode<T> {
    if (node === null) return new AVLNode(value);

    const cmp = value.compareTo(node.value);
    if (cmp < 0) {
      node.left = this._insert(node.left, value);
    } else {
      node.right = this._insert(node.right, value);
    }

    this.update(node);
    return this.balance(node);
  }

  private update(node: AVLNode<T>): void {
    const leftHeight = node.left === null ? -1 : node.left.height;
    const rightHeight = node.right === null ? -1 : node.right.height;

    node.height = 1 + Math.max(leftHeight, rightHeight);
    node.bf = rightHeight - leftHeight;
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
    if (elem == null) return false;
    if (this.contains(elem)) {
      this.root = this._remove(this.root, elem);
      this.nodeCount--;
      return true;
    }
    return false;
  }

  private _remove(node: AVLNode<T> | null, elem: T): AVLNode<T> | null {
    if (node === null) return null;

    const cmp = elem.compareTo(node.value);

    if (cmp < 0) {
      node.left = this._remove(node.left, elem);
    } else if (cmp > 0) {
      node.right = this._remove(node.right, elem);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        // Remove from the side with the greater height to maintain balance
        if (node.left.height > node.right.height) {
          const successorValue = this.findMax(node.left);
          node.value = successorValue;
          node.left = this._remove(node.left, successorValue);
        } else {
          const successorValue = this.findMin(node.right);
          node.value = successorValue;
          node.right = this._remove(node.right, successorValue);
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
   * In-order traversal iterator using a generator.
   */
  public *[Symbol.iterator](): Iterator<T> {
    const stack: AVLNode<T>[] = [];
    let current: AVLNode<T> | null = this.root;

    while (stack.length > 0 || current !== null) {
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop()!;
      yield current.value;
      current = current.right;
    }
  }

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
