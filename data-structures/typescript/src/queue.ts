import { LinkedList } from "./linked-list";

export class Queue<Type> {
  private list = new LinkedList<Type>();

  constructor(element?: Type) {
    if (element) {
      this.offer(element);
    }
  }

  size(): number {
    return this.list.getSize();
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  peek(): Type {
    if (this.isEmpty()) {
      throw new Error("Queue empty");
    }

    return this.list.peekFirst();
  }

  poll(): Type {
    if (this.isEmpty()) {
      throw new Error("Queue empty");
    }

    return this.list.removeFirst();
  }

  offer(element: Type) {
    this.list.addLast(element);
  }
}
