import { HashTableOpenAddressing } from "./hash-table-open-addressing";

export class HashTableQuadraticProbing<K, V> extends HashTableOpenAddressing<
  K,
  V
> {
  constructor(capacity?: number, loadFactor?: number) {
    super(capacity, loadFactor);
  }

  // Given a number this method finds the next power of two above this value.
  private static nextPowerOfTwo(n: number): number {
    // Equivalent to Integer.highestOneBit(n) << 1
    const highest = 1 << (31 - Math.clz32(n));
    return highest << 1;
  }

  // No setup required for quadratic probing.
  protected setupProbing(_key: K): void {
    // no-op
  }

  // Quadratic probing: f(x) = (x² + x) / 2
  protected probe(x: number): number {
    return (x * x + x) >> 1;
  }

  // Increase the capacity of the table to the next power of two.
  protected override increaseCapacity(): void {
    this.capacity = HashTableQuadraticProbing.nextPowerOfTwo(this.capacity);
  }

  // Ensure capacity is a power of two.
  protected adjustCapacity(): void {
    const pow2 = 1 << (31 - Math.clz32(this.capacity));

    if (this.capacity !== pow2) {
      this.increaseCapacity();
    }
  }
}
