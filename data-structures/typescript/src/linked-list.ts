class Node<Type> {
  private data: Type | null;
  private prev: Node<Type> | null;
  private next: Node<Type> | null;

  constructor(data: Type, prev: Node<Type> | null, next: Node<Type> | null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }

  getData() {
    return this.data;
  }

  getPrev() {
    return this.prev;
  }

  getNext() {
    return this.next;
  }

  setData(data: Type | null) {
    this.data = data;
  }

  setPrev(prev: Node<Type> | null) {
    this.prev = prev;
  }

  setNext(next: Node<Type> | null) {
    this.next = next;
  }
}

export class LinkedList<Type> {
  private size = 0;
  private head: Node<Type> | null = null;
  private tail: Node<Type> | null = null;

  clear(): void {
    let trav = this.head;
    while (trav !== null) {
      let next = trav.getNext();
      trav.setPrev(trav.getNext());
      trav.setNext(null);
      trav = next;
    }
    this.head = this.tail = trav = null;
    this.size = 0;
  }

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.getSize() === 0;
  }

  add(element: Type): void {
    this.addLast(element);
  }

  addLast(element: Type): void {
    if (this.isEmpty()) {
      this.head = new Node(element, null, null);
      this.tail = new Node(element, null, null);
    } else {
      this.tail?.setNext(new Node(element, this.tail, null));
      this.tail = this.tail?.getNext() ?? null;
    }
    this.size++;
  }

  peekFirst(): Type {
    if (this.isEmpty()) {
      throw new Error("Empty list");
    }

    return this.head?.getData()!;
  }

  peekLast(): Type {
    if (this.isEmpty()) {
      throw new Error("Empty list");
    }

    return this.tail?.getData()!;
  }

  removeFirst(): Type {
    if (this.isEmpty()) {
      throw new Error("Empty list");
    }

    let data = this.head?.getData();
    this.head = this.head?.getNext() ?? null;
    this.size--;

    if (this.isEmpty()) {
      this.tail = null;
    } else {
      this.head?.setPrev(null);
    }

    return data!;
  }

  public removeLast(): Type {
    if (this.isEmpty()) {
      throw new Error("Empty list");
    }

    let data = this.tail?.getData();
    this.tail = this.tail?.getPrev() ?? null;
    this.size--;

    if (this.isEmpty()) {
      this.head = null;
    } else {
      this.tail?.setNext(null);
    }

    return data!;
  }

  removeAt(index: number): Type | null {
    if (index < 0 || index >= this.size) {
      throw new Error();
    }

    let i: number;
    let trav: Node<Type> | null;

    if (index < this.size / 2) {
      // Search from the front of the list
      for (i = 0, trav = this.head; i !== index; i++) {
        trav = trav?.getNext() ?? null;
      }
    } else {
      // Search from the back of the list
      for (i = this.size - 1, trav = this.tail; i !== index; i--) {
        trav = trav?.getPrev() ?? null;
      }
    }

    return this.remove(trav);
  }

  private remove(node: Node<Type> | null): Type | null {
    if (!node) return null;

    if (node.getPrev() === null) {
      return this.removeFirst();
    }

    if (node.getNext() === null) {
      return this.removeLast();
    }

    node.getNext()?.setPrev(node.getPrev());
    node.getPrev()?.setNext(node.getNext());

    let data = node.getData();

    node.setData(null);
    node.setNext(null);
    node.setPrev(null);
    this.size--;

    return data!;
  }

  public indexOf(element: any): number {
    let index = 0;
    let trav = this.head;

    if (element === null) {
      for (; trav !== null; trav = trav.getNext(), index++) {
        if (trav.getData() === null) {
          return index;
        }
      }
    } else {
      for (; trav != null; trav = trav.getNext(), index++) {
        if (element === trav.getData()) {
          return index;
        }
      }
    }

    return -1;
  }

  public contains(element: any): boolean {
    return this.indexOf(element) !== -1;
  }
}
