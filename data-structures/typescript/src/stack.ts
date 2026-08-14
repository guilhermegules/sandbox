import { LinkedList } from "./linked-list";

export class Stack<Type> {
  private list = new LinkedList<Type>();

  constructor(firstElement?: Type) {
    if (firstElement) {
      this.push(firstElement);
    }
  }

  size(): number {
    return this.list.getSize();
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  push(element: Type): void {
    this.list.add(element);
  }

  pop(): Type {
    if (this.isEmpty()) {
      throw new Error("Empty stack");
    }

    return this.list.removeLast();
  }

  peek(): Type {
    if (this.isEmpty()) {
      throw new Error("Empty stack");
    }

    return this.list.peekLast();
  }
}
