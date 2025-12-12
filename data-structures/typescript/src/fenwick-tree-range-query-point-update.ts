/**
 * Fenwick Tree (Binary Indexed Tree) implementation
 * supporting point updates and range sum queries.
 */
export class FenwickTreeRangeQueryPointUpdate {
  private readonly N: number;
  private tree: number[];

  // Create an empty Fenwick Tree with size = sz (0-based externally, 1-based internally)
  constructor(sizeOrValues: number | number[]) {
    if (Array.isArray(sizeOrValues)) {
      const values = sizeOrValues;

      if (!values) {
        throw new Error("Values array cannot be null!");
      }

      this.N = values.length;
      values[0] = 0; // Must remain unused

      // Clone array because the constructor manipulates it in place
      this.tree = [...values];

      // Build Fenwick Tree in O(n)
      for (let i = 1; i < this.N; i++) {
        const parent = i + FenwickTreeRangeQueryPointUpdate.lsb(i);
        if (parent < this.N) {
          this.tree[parent]! += this.tree[i]!;
        }
      }
    } else {
      const sz = sizeOrValues;
      this.N = sz + 1;
      this.tree = new Array(this.N).fill(0);
    }
  }

  // Least significant bit
  private static lsb(i: number): number {
    return i & -i;
  }

  // Computes prefix sum [1..i]
  private prefixSum(i: number): number {
    let sum = 0;
    while (i !== 0) {
      sum += this.tree[i]!;
      // This clears (removes) the lowest-set bit from i.
      // Example: i = 0b110100 → lsb(i) = 0b000100 → ~lsb(i) = 0b111011
      // i &= ~lsb(i) gives 0b110000.
      // This moves i to its parent index in the Fenwick Tree.
      i &= ~FenwickTreeRangeQueryPointUpdate.lsb(i);
    }
    return sum;
  }

  // Range sum query [left, right]
  sum(left: number, right: number): number {
    if (right < left) {
      throw new Error("Make sure right >= left");
    }
    return this.prefixSum(right) - this.prefixSum(left - 1);
  }

  // Get value at index i
  get(i: number): number {
    return this.sum(i, i);
  }

  // Add v to index i
  add(i: number, v: number): void {
    while (i < this.N) {
      this.tree[i]! += v;
      i += FenwickTreeRangeQueryPointUpdate.lsb(i);
    }
  }

  // Set index i to value v
  set(i: number, v: number): void {
    const current = this.get(i);
    this.add(i, v - current);
  }

  toString(): string {
    return `[${this.tree.join(", ")}]`;
  }
}
