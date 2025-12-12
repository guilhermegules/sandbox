/**
 * Fenwick Tree (Binary Indexed Tree)
 * Supports **range updates** and **point queries**.
 */
export class FenwickTreeRangeUpdatePointQuery {
  private readonly N: number;

  /** Original Fenwick tree (prefix sums of initial values) */
  private originalTree: number[];

  /** Current Fenwick tree (with applied range updates) */
  private currentTree: number[];

  /**
   * Construct a Fenwick tree using a **1-based array**.
   * values[0] is unused and will be overridden to 0.
   */
  constructor(values: number[]) {
    if (!values) {
      throw new Error("Values array cannot be null!");
    }

    this.N = values.length;
    values[0] = 0; // enforce 1-based behavior

    const fenwickTree = [...values];

    // Build tree in O(n)
    for (let i = 1; i < this.N; i++) {
      const parent = i + FenwickTreeRangeUpdatePointQuery.lsb(i);
      if (parent < this.N) {
        fenwickTree[parent]! += fenwickTree[i]!;
      }
    }

    this.originalTree = fenwickTree;
    this.currentTree = [...fenwickTree];
  }

  /**
   * Add "val" to every index in the interval [left, right].
   * Achieved using range-difference trick:
   *   add(left, +val)
   *   add(right + 1, -val)
   */
  updateRange(left: number, right: number, val: number): void {
    this.add(left, +val);
    this.add(right + 1, -val);
  }

  /**
   * Add v to index i and all Fenwick nodes covering i.
   */
  private add(i: number, v: number): void {
    while (i < this.N) {
      this.currentTree[i]! += v;
      i += FenwickTreeRangeUpdatePointQuery.lsb(i);
    }
  }

  /**
   * Get the actual value at a single index i.
   *
   * Formula:
   *   currentPrefix(i) - originalPrefix(i - 1)
   */
  get(i: number): number {
    return (
      this.prefixSum(i, this.currentTree) -
      this.prefixSum(i - 1, this.originalTree)
    );
  }

  /**
   * Standard Fenwick prefix sum [1..i]
   */
  private prefixSum(i: number, tree: number[]): number {
    let sum = 0;

    while (i !== 0) {
      sum += tree[i]!;

      // Remove lowest-set bit
      i &= ~FenwickTreeRangeUpdatePointQuery.lsb(i);
      /**
       * Explanation:
       *   lsb(i) isolates the lowest bit of i.
       *   ~lsb(i) flips all bits except that lowest bit.
       *   i &= ~lsb(i) clears the lowest-set bit.
       *
       * Example:
       *   i = 0b110100
       *   lsb(i) = 0b000100
       *   ~lsb(i) = 0b111011
       *   i &= ~lsb(i) → 0b110000
       *
       * This moves "i" to its Fenwick tree parent.
       */
    }

    return sum;
  }

  /**
   * Least significant bit: isolates lowest 1-bit.
   */
  private static lsb(i: number): number {
    return i & -i;
  }
}
