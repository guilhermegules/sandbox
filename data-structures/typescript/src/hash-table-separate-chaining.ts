export type Hashable = string | number | { toString(): string };

function defaultHash(key: Hashable): number {
  if (typeof key === "number") {
    return Math.trunc(key);
  }

  const str = key.toString();
  // Common DJB2 seed
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    // XOR with the character value and add it to the hash
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  // Convert to unsigned 32-bit
  return hash >>> 0;
}

class Entry<Key extends Hashable, Value> {
  hash: number;
  key: Key;
  value: Value;

  constructor(key: Key, value: Value, hasher: (k: Key) => number) {
    this.key = key;
    this.value = value;
    this.hash = hasher(key);
  }

  equals(other: Entry<Key, Value>): boolean {
    return this.hash === other.hash && this.key === other.key;
  }

  toString(): string {
    return `${this.key} => ${this.value}`;
  }
}

export class HashTableSeparateChaining<Key extends Hashable, Value>
  implements Iterable<Key>
{
  private static readonly DEFAULT_CAPACITY = 3;
  private static readonly DEFAULT_LOAD_FACTOR = 0.75;

  private maxLoadFactor: number;
  private capacity: number;
  private threshold: number;
  private sizeValue = 0;
  private table: Array<Entry<Key, Value>[] | null>;
  private hasher: (key: Key) => number;

  constructor(
    capacity = HashTableSeparateChaining.DEFAULT_CAPACITY,
    maxLoadFactor = HashTableSeparateChaining.DEFAULT_LOAD_FACTOR,
    hasher: (key: Key) => number = defaultHash
  ) {
    if (capacity < 0) throw new Error("Illegal capacity");
    if (maxLoadFactor <= 0) throw new Error("Illegal loadFactor");

    this.hasher = hasher;
    this.maxLoadFactor = maxLoadFactor;
    this.capacity = Math.max(
      HashTableSeparateChaining.DEFAULT_CAPACITY,
      capacity
    );
    this.threshold = Math.floor(this.capacity * maxLoadFactor);

    this.table = new Array(this.capacity).fill(null);
  }

  size(): number {
    return this.sizeValue;
  }

  isEmpty(): boolean {
    return this.sizeValue === 0;
  }

  clear(): void {
    this.table.fill(null);
    this.sizeValue = 0;
  }

  containsKey(key: Key): boolean {
    return this.hasKey(key);
  }

  hasKey(key: Key): boolean {
    const bucketIndex = this.normalizeIndex(this.hasher(key));
    return this.bucketSeekEntry(bucketIndex, key) !== null;
  }

  insert(key: Key, value: Value): Value | null {
    const entry = new Entry(key, value, this.hasher);
    const bucketIndex = this.normalizeIndex(entry.hash);
    return this.bucketInsertEntry(bucketIndex, entry);
  }

  get(key: Key): Value | null {
    const bucketIndex = this.normalizeIndex(this.hasher(key));
    const entry = this.bucketSeekEntry(bucketIndex, key);
    return entry ? entry.value : null;
  }

  remove(key: Key): Value | null {
    const bucketIndex = this.normalizeIndex(this.hasher(key));
    return this.bucketRemoveEntry(bucketIndex, key);
  }

  keys(): Key[] {
    const result: Key[] = [];
    for (const bucket of this.table) {
      if (bucket) {
        for (const e of bucket) {
          result.push(e.key);
        }
      }
    }
    return result;
  }

  values(): Value[] {
    const result: Value[] = [];
    for (const bucket of this.table) {
      if (bucket) {
        for (const e of bucket) {
          result.push(e.value);
        }
      }
    }
    return result;
  }

  /**
   * Converts any hash (positive or negative) into a valid array index within the range: 0 <= index < capacity
   */
  private normalizeIndex(hash: number): number {
    return (hash & 0x7fffffff) % this.capacity;
  }

  private bucketSeekEntry(
    bucketIndex: number,
    key: Key
  ): Entry<Key, Value> | null {
    const bucket = this.table[bucketIndex];
    if (!bucket) return null;

    for (const entry of bucket) {
      if (entry.key === key) return entry;
    }
    return null;
  }

  private bucketInsertEntry(
    bucketIndex: number,
    entry: Entry<Key, Value>
  ): Value | null {
    let bucket = this.table[bucketIndex];
    if (!bucket) {
      bucket = [];
      this.table[bucketIndex] = bucket;
    }

    const existing = this.bucketSeekEntry(bucketIndex, entry.key);
    if (existing === null) {
      bucket.push(entry);
      if (++this.sizeValue > this.threshold) this.resizeTable();
      return null;
    } else {
      const oldVal = existing.value;
      existing.value = entry.value;
      return oldVal;
    }
  }

  private bucketRemoveEntry(bucketIndex: number, key: Key): Value | null {
    const bucket = this.table[bucketIndex];
    if (!bucket) return null;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i]?.key === key) {
        const removed = bucket.splice(i, 1)[0];
        this.sizeValue--;
        return removed?.value ?? null;
      }
    }
    return null;
  }

  private resizeTable(): void {
    this.capacity *= 2;
    this.threshold = Math.floor(this.capacity * this.maxLoadFactor);

    const newTable: Array<Entry<Key, Value>[] | null> = new Array(
      this.capacity
    ).fill(null);

    for (const oldBucket of this.table) {
      if (!oldBucket) continue;

      for (const entry of oldBucket) {
        const newIndex = this.normalizeIndex(entry.hash);
        if (!newTable[newIndex]) newTable[newIndex] = [];
        newTable[newIndex]!.push(entry);
      }
    }

    this.table = newTable;
  }

  [Symbol.iterator](): Iterator<Key> {
    const buckets = this.table;
    let bucketIndex = 0;
    let innerIndex = 0;

    return {
      next(): IteratorResult<Key> {
        while (bucketIndex < buckets.length) {
          const bucket = buckets[bucketIndex];
          if (bucket && innerIndex < bucket.length) {
            const key = bucket[innerIndex++]?.key;
            return { value: key as Key, done: false };
          }
          bucketIndex++;
          innerIndex = 0;
        }
        return { value: undefined as any, done: true };
      },
    };
  }

  toString(): string {
    const parts: string[] = [];
    for (const bucket of this.table) {
      if (bucket) {
        for (const entry of bucket) {
          parts.push(entry.toString());
        }
      }
    }
    return `{ ${parts.join(", ")} }`;
  }
}
