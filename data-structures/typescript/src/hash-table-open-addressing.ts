export abstract class HashTableOpenAddressing<K, V> implements Iterable<K> {
  protected loadFactor: number;
  protected capacity: number;
  protected threshold: number;
  protected modificationCount: number = 0;

  // number of used buckets (including tombstones)
  protected usedBuckets: number = 0;

  // number of actual keys (excludes tombstones)
  protected keyCount: number = 0;

  protected keys: (K | null)[];
  protected values: (V | null | undefined)[];

  // Tombstone marker
  protected readonly TOMBSTONE: any = Symbol("TOMBSTONE");

  private static readonly DEFAULT_CAPACITY = 7;
  private static readonly DEFAULT_LOAD_FACTOR = 0.65;

  constructor(capacity?: number, loadFactor?: number) {
    const cap = capacity ?? HashTableOpenAddressing.DEFAULT_CAPACITY;
    const lf = loadFactor ?? HashTableOpenAddressing.DEFAULT_LOAD_FACTOR;

    if (cap <= 0) throw new Error("Illegal capacity: " + cap);
    if (lf <= 0 || !isFinite(lf)) throw new Error("Illegal loadFactor: " + lf);

    this.loadFactor = lf;
    this.capacity = Math.max(HashTableOpenAddressing.DEFAULT_CAPACITY, cap);

    this.adjustCapacity();
    this.threshold = Math.floor(this.capacity * this.loadFactor);

    this.keys = Array(this.capacity).fill(null);
    this.values = Array(this.capacity).fill(null);
  }

  // ---- ABSTRACT METHODS -----
  protected abstract setupProbing(key: K): void;
  protected abstract probe(x: number): number;
  protected abstract adjustCapacity(): void;

  protected increaseCapacity(): void {
    this.capacity = this.capacity * 2 + 1;
  }

  clear(): void {
    this.keys.fill(null);
    this.values.fill(null);
    this.keyCount = 0;
    this.usedBuckets = 0;
    this.modificationCount++;
  }

  size(): number {
    return this.keyCount;
  }

  getCapacity(): number {
    return this.capacity;
  }

  isEmpty(): boolean {
    return this.keyCount === 0;
  }

  put(key: K, value: V): V | null | undefined {
    return this.insert(key, value);
  }

  add(key: K, value: V): V | null | undefined {
    return this.insert(key, value);
  }

  containsKey(key: K): boolean {
    return this.hasKey(key);
  }

  keysList(): K[] {
    const list: K[] = [];
    for (let i = 0; i < this.capacity; i++) {
      const k = this.keys[i];
      if (k && k !== this.TOMBSTONE) {
        list.push(k);
      }
    }
    return list;
  }

  valuesList(): V[] {
    const list: V[] = [];
    for (let i = 0; i < this.capacity; i++) {
      const k = this.keys[i];
      if (k !== null && k !== this.TOMBSTONE) list.push(this.values[i]!);
    }
    return list;
  }

  protected resizeTable(): void {
    this.increaseCapacity();
    this.adjustCapacity();

    this.threshold = Math.floor(this.capacity * this.loadFactor);

    const oldKeys = this.keys;
    const oldValues = this.values;

    this.keys = Array(this.capacity).fill(null);
    this.values = Array(this.capacity).fill(null);
    this.keyCount = 0;
    this.usedBuckets = 0;

    for (let i = 0; i < oldKeys.length; i++) {
      const key = oldKeys[i];
      if (key && key !== this.TOMBSTONE) {
        this.insert(key, oldValues[i]!);
      }
    }
  }

  protected normalizeIndex(hash: number): number {
    return (hash & 0x7fffffff) % this.capacity;
  }

  static gcd(a: number, b: number): number {
    if (b === 0) return a;
    return HashTableOpenAddressing.gcd(b, a % b);
  }

  insert(key: K, value: V): V | null | undefined {
    if (key == null) throw new Error("Null key");
    if (this.usedBuckets >= this.threshold) {
      this.resizeTable();
    }

    this.setupProbing(key);
    const offset = this.normalizeIndex(this.hashKey(key));
    let j = -1;

    for (
      let i = offset, x = 1;
      ;
      i = this.normalizeIndex(offset + this.probe(x++))
    ) {
      const k = this.keys[i];

      if (k === this.TOMBSTONE) {
        if (j === -1) j = i;
      } else if (k) {
        if (this.equalsKey(k, key)) {
          const oldValue = this.values[i];

          if (j === -1) {
            this.values[i] = value;
          } else {
            this.keys[i] = this.TOMBSTONE;
            this.values[i] = null;
            this.keys[j] = key;
            this.values[j] = value;
          }

          this.modificationCount++;
          return oldValue;
        }
      } else {
        if (j === -1) {
          this.usedBuckets++;
          this.keyCount++;
          this.keys[i] = key;
          this.values[i] = value;
        } else {
          this.keyCount++;
          this.keys[j] = key;
          this.values[j] = value;
        }

        this.modificationCount++;
        return null;
      }
    }
  }

  hasKey(key: K): boolean {
    if (key == null) throw new Error("Null key");

    this.setupProbing(key);
    const offset = this.normalizeIndex(this.hashKey(key));
    let j = -1;

    for (
      let i = offset, x = 1;
      ;
      i = this.normalizeIndex(offset + this.probe(x++))
    ) {
      const k = this.keys[i];

      if (k === this.TOMBSTONE) {
        if (j === -1) j = i;
      } else if (k) {
        if (this.equalsKey(k, key)) {
          if (j !== -1) {
            this.keys[j] = k;
            this.values[j] = this.values[i];
            this.keys[i] = this.TOMBSTONE;
            this.values[i] = null;
          }
          return true;
        }
      } else {
        return false;
      }
    }
  }

  get(key: K): V | null | undefined {
    if (key == null) throw new Error("Null key");

    this.setupProbing(key);
    const offset = this.normalizeIndex(this.hashKey(key));
    let j = -1;

    for (
      let i = offset, x = 1;
      ;
      i = this.normalizeIndex(offset + this.probe(x++))
    ) {
      const k = this.keys[i];

      if (k === this.TOMBSTONE) {
        if (j === -1) j = i;
      } else if (k) {
        if (this.equalsKey(k, key)) {
          if (j !== -1) {
            this.keys[j] = k;
            this.values[j] = this.values[i];
            this.keys[i] = this.TOMBSTONE;
            const v = this.values[i];
            this.values[i] = null;
            return v!;
          } else {
            return this.values[i];
          }
        }
      } else {
        return null;
      }
    }
  }

  remove(key: K): V | null | undefined {
    if (key == null) throw new Error("Null key");

    this.setupProbing(key);
    const offset = this.normalizeIndex(this.hashKey(key));

    for (
      let i = offset, x = 1;
      ;
      i = this.normalizeIndex(offset + this.probe(x++))
    ) {
      const k = this.keys[i];

      if (k === this.TOMBSTONE) continue;
      if (!k) return null;

      if (this.equalsKey(k, key)) {
        this.keyCount--;
        this.modificationCount++;

        const oldValue = this.values[i];
        this.keys[i] = this.TOMBSTONE;
        this.values[i] = null;

        return oldValue;
      }
    }
  }

  protected hashKey(key: K): number {
    return typeof key === "string"
      ? this.stringHash(key)
      : (key as any).hashCode
      ? (key as any).hashCode()
      : this.defaultHash(key);
  }

  protected equalsKey(a: K, b: K): boolean {
    return a === b;
  }

  protected defaultHash(key: any): number {
    return this.stringHash(JSON.stringify(key));
  }

  protected stringHash(str: string): number {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return h;
  }

  [Symbol.iterator](): Iterator<K> {
    const expectedModCount = this.modificationCount;
    let index = 0;
    let keysLeft = this.keyCount;
    const capacity = this.capacity;

    return {
      next: (): IteratorResult<K> => {
        if (expectedModCount !== this.modificationCount) {
          throw new Error("ConcurrentModificationException");
        }

        while (
          index < capacity &&
          (this.keys[index] === null || this.keys[index] === this.TOMBSTONE)
        ) {
          index++;
        }

        if (keysLeft === 0) {
          return { done: true, value: undefined as any };
        }

        const value = this.keys[index] as K;
        index++;
        keysLeft--;

        return { done: false, value };
      },
    };
  }

  toString(): string {
    const entries = [];

    for (let i = 0; i < this.capacity; i++) {
      const k = this.keys[i];
      if (k !== null && k !== this.TOMBSTONE) {
        entries.push(`${String(k)} => ${String(this.values[i])}`);
      }
    }

    return `{${entries.join(", ")}}`;
  }
}
