type Comparator<T> = (a: T, b: T) => number;

/**
 * An indexed min D-ary heap priority queue.
 *
 * Keys are integers in range [0, N)
 */
export class MinIndexedDHeap<T> {
  private sz = 0;
  private readonly N: number;
  private readonly D: number;

  private readonly child: number[];
  private readonly parent: number[];

  /** Position Map: key index -> heap position */
  public readonly pm: number[];

  /** Inverse Map: heap position -> key index */
  public readonly im: number[];

  /** Values indexed by key index */
  public readonly values: Array<T | null>;

  private readonly compare: Comparator<T>;

  constructor(degree: number, maxSize: number, comparator: Comparator<T>) {
    if (maxSize <= 0) throw new Error("maxSize <= 0");

    this.D = Math.max(2, degree);
    this.N = Math.max(this.D + 1, maxSize);
    this.compare = comparator;

    this.im = new Array(this.N);
    this.pm = new Array(this.N);
    this.child = new Array(this.N);
    this.parent = new Array(this.N);
    this.values = new Array(this.N);

    for (let i = 0; i < this.N; i++) {
      this.parent[i] = Math.floor((i - 1) / this.D);
      this.child[i] = i * this.D + 1;
      this.pm[i] = -1;
      this.im[i] = -1;
      this.values[i] = null;
    }
  }

  size(): number {
    return this.sz;
  }

  isEmpty(): boolean {
    return this.sz === 0;
  }

  contains(ki: number): boolean {
    this.keyInBoundsOrThrow(ki);
    return this.pm[ki] !== -1;
  }

  peekMinKeyIndex(): number | undefined {
    this.isNotEmptyOrThrow();
    return this.im[0];
  }

  pollMinKeyIndex(): number | undefined {
    const minKi = this.peekMinKeyIndex()!;
    this.delete(minKi);
    return minKi;
  }

  peekMinValue(): T {
    this.isNotEmptyOrThrow();
    return this.values[this.im[0]!]!;
  }

  pollMinValue(): T {
    const minValue = this.peekMinValue();
    this.delete(this.peekMinKeyIndex()!);
    return minValue;
  }

  insert(ki: number, value: T): void {
    if (this.contains(ki))
      throw new Error(`index already exists; received: ${ki}`);

    this.valueNotNullOrThrow(value);

    this.pm[ki] = this.sz;
    this.im[this.sz] = ki;
    this.values[ki] = value;
    this.swim(this.sz++);
  }

  valueOf(ki: number): T {
    this.keyExistsOrThrow(ki);
    return this.values[ki]!;
  }

  delete(ki: number): T {
    this.keyExistsOrThrow(ki);

    const i = this.pm[ki]!;
    this.swap(i, --this.sz);
    this.sink(i);
    this.swim(i);

    const value = this.values[ki]!;
    this.values[ki] = null;
    this.pm[ki] = -1;
    this.im[this.sz] = -1;

    return value;
  }

  update(ki: number, value: T): T {
    this.keyExistsAndValueNotNullOrThrow(ki, value);

    const i = this.pm[ki]!;
    const oldValue = this.values[ki]!;
    this.values[ki] = value;

    this.sink(i);
    this.swim(i);

    return oldValue;
  }

  decrease(ki: number, value: T): void {
    this.keyExistsAndValueNotNullOrThrow(ki, value);
    if (this.lessValue(value, this.values[ki]!)) {
      this.values[ki] = value;
      this.swim(this.pm[ki]!);
    }
  }

  increase(ki: number, value: T): void {
    this.keyExistsAndValueNotNullOrThrow(ki, value);
    if (this.lessValue(this.values[ki]!, value)) {
      this.values[ki] = value;
      this.sink(this.pm[ki]!);
    }
  }

  /* ================= Heap helpers ================= */

  private sink(i: number): void {
    for (let j = this.minChild(i); j !== -1; ) {
      this.swap(i, j);
      i = j;
      j = this.minChild(i);
    }
  }

  private swim(i: number): void {
    while (i > 0 && this.less(i, this.parent[i]!)) {
      this.swap(i, this.parent[i]!);
      i = this.parent[i]!;
    }
  }

  private minChild(i: number): number {
    let index = -1;
    const from = this.child[i]!;
    const to = Math.min(this.sz, from + this.D);

    for (let j = from; j < to; j++) {
      if (this.less(j, i)) {
        index = j;
        i = j;
      }
    }
    return index;
  }

  private swap(i: number, j: number): void {
    this.pm[this.im[j]!] = i;
    this.pm[this.im[i]!] = j;

    const tmp = this.im[i]!;
    this.im[i] = this.im[j]!;
    this.im[j] = tmp;
  }

  private less(i: number, j: number): boolean {
    return (
      this.compare(this.values[this.im[i]!]!, this.values[this.im[j]!]!) < 0
    );
  }

  private lessValue(a: T, b: T): boolean {
    return this.compare(a, b) < 0;
  }

  toString(): string {
    return this.im.slice(0, this.sz).toString();
  }

  /* ================= Validation helpers ================= */

  private isNotEmptyOrThrow(): void {
    if (this.isEmpty()) throw new Error("Priority queue underflow");
  }

  private keyExistsAndValueNotNullOrThrow(ki: number, value: T): void {
    this.keyExistsOrThrow(ki);
    this.valueNotNullOrThrow(value);
  }

  private keyExistsOrThrow(ki: number): void {
    if (!this.contains(ki))
      throw new Error(`Index does not exist; received: ${ki}`);
  }

  private valueNotNullOrThrow(value: T | null): void {
    if (value === null) throw new Error("value cannot be null");
  }

  private keyInBoundsOrThrow(ki: number): void {
    if (ki < 0 || ki >= this.N)
      throw new Error(`Key index out of bounds; received: ${ki}`);
  }

  /* ================= Testing ================= */

  isMinHeap(): boolean {
    return this.isMinHeapAt(0);
  }

  private isMinHeapAt(i: number): boolean {
    const from = this.child[i]!;
    const to = Math.min(this.sz, from + this.D);

    for (let j = from; j < to; j++) {
      if (!this.less(i, j)) return false;
      if (!this.isMinHeapAt(j)) return false;
    }
    return true;
  }
}
