export class PriorityQueue<Type> {
  /**
   * The number of elements currently inside the heap
   *
   */
  private heapSize = 0;
  /**
   * The internal capacity of the heap
   *
   */
  private heapCapacity = 0;

  /**
   * Dynamic list to track the elements inside the heap
   *
   */
  private heap: (Type | null)[] | null = [];

  /**
   * This map keeps track of the possible indices a particular node
   * value is found in the heap. Having this mapping lets us have O(log(n))
   * removals and O(1) element containment check
   * at the cost of some additional space and minor overhead
   */
  private map = new Map<Type, Set<number>>();

  constructor({ size, elements }: { size?: number; elements?: Type[] }) {
    if (size) {
      this.heap = new Array(size);
      return;
    }

    // Construct a priority queue using heapify in O(n) time, a great explanation can be found here
    // https://www.researchgate.net/publication/26622083_A_Heapify_Based_Parallel_Sorting_Algorithm
    if (elements) {
      this.heapSize = elements.length;
      this.heapCapacity = elements.length;

      for (let i = 0; i < this.heapSize; i++) {
        this.mapAdd(elements[i]!, i);
        this.heap?.push(elements[i]!);
      }

      // Heapify process, O(n)
      for (let i = Math.max(0, this.heapSize / 2 - 1); i >= 0; i--) {
        this.sink(i);
      }
      return;
    }

    this.heapCapacity = 1;
  }

  isEmpty() {
    return this.heapSize === 0;
  }

  clear() {
    for (let i = 0; i < this.heapCapacity; i++) {
      if (this.heap) {
        this.heap[i] = null;
      }
    }
    this.heapSize = 0;
    this.map.clear();
  }

  size() {
    return this.heapSize;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.heap?.at(0) ?? null;
  }

  /**
   * Removes the root of the heap, O(log(n))
   * @returns {Type}
   */
  pool() {
    return this.removeAt(0);
  }

  // Test if an element is in heap, O(1)
  contains(element: Type) {
    if (element === null) return false;

    // Map lookup O(1)
    return this.map.has(element);
  }

  // Linear scan to check containment, O(n)
  linearContains(element: Type) {
    for (let i = 0; i < this.heapSize; i++) {
      if (this.heap?.at(i) === element) {
        return true;
      }
    }

    return false;
  }

  /**
   * Adds an element to the priority queue, the
   * element must not be null, O(log(n))
   * @param element {Type}
   */
  add(element: Type) {
    if (element === null) {
      throw new Error("Illegal argument");
    }

    if (this.heapSize < this.heapCapacity) {
      if (this.heap) {
        this.heap[this.heapSize] = element;
      }
    } else {
      this.heap?.push(element);
      this.heapCapacity++;
    }

    this.mapAdd(element, this.heapSize);

    this.swim(this.heapSize);
    this.heapSize++;
  }

  /**
   * Tests if the value of node i <= node j
   * This method assumes i and j are valud indices, O(1)
   * @param i number
   * @param j number
   */
  less(i: number, j: number) {
    const nodeI = this.heap?.at(i);
    const nodeJ = this.heap?.at(j);

    return nodeI && nodeJ && nodeI <= nodeJ;
  }

  /**
   * Bottom up node swim, O(log(n))
   * @param index {number}
   */
  swim(index: number) {
    // Grab the index of the next parent node to index
    let parent = (index - 1) / 2;

    // Keep swimming while we have not reached the root and while we're less than our parent.
    while (index > 0 && this.less(index, parent)) {
      // Exchange k with the parent
      this.swap(parent, index);
      index = parent;

      // Grab the index of the next parent node to index
      parent = (index - 1) / 2;
    }
  }

  /**
   * Top down node sink, O(log(n))
   * @param index {number}
   */
  sink(index: number) {
    while (true) {
      let left = 2 * index + 1; // left node
      let right = 2 * index + 2; // right node
      let smallest = left; // Assume left is the smallest node of the two children

      // Find which is smaller left or right
      // If right is smaller set smallest to be right
      if (right < this.heapSize && this.less(right, left)) {
        smallest = right;
      }

      // Stop if we're outside the bounds of the tree
      // Or stop early if we cannot sink index anymore
      if (left >= this.heapSize || this.less(index, smallest)) {
        break;
      }

      // Move down the tree follwing the smallest node
      this.swap(smallest, index);
      index = smallest;
    }
  }

  // Swap two nodes. Assumes i and j are valid O(1)
  swap(i: number, j: number) {
    const nodeI = this.heap!.at(i)!;
    const nodeJ = this.heap!.at(j)!;

    this.heap![i] = nodeJ;
    this.heap![j] = nodeI;

    this.mapSwap(nodeI, nodeJ, i, j);
  }

  remove(element: Type) {
    if (element === null) return false;

    const index = this.mapGet(element);

    if (index) {
      this.removeAt(index);
    }

    return index !== null;
  }

  linearRemove(element: Type) {
    for (let index = 0; index < this.heapSize; index++) {
      if (element === this.heap?.at(index)) {
        this.removeAt(index);
        return true;
      }
    }
    return false;
  }

  removeAt(index: number) {
    if (this.isEmpty()) {
      return null;
    }
    this.heapSize--;
    const removedData = this.heap?.at(index);
    if (!removedData) {
      return null;
    }
    this.swap(index, this.heapSize);

    this.heap![index] = null;
    this.mapRemove(removedData, this.heapSize);

    if (index === this.heapSize) {
      return removedData;
    }

    const element = this.heap!.at(index);

    // Try sink index
    this.sink(index);

    // If sinking did not work try swim
    if (this.heap?.at(index) === element) {
      this.swim(index);
    }

    return removedData;
  }

  /**
   * Recursively checks if this heap is a min heap
   * This method is just for testing purposes to make sure the heap invariant is still being maintained
   * Called this method with index = 0 to start at the root
   * @param index {number}
   */
  isMinHeap(index: number): boolean {
    if (index >= this.heapSize) {
      return true;
    }

    let left = 2 * index + 1;
    let right = 2 * index + 2;

    if (left < this.heapSize && !this.less(index, left)) {
      return true;
    }

    if (right < this.heapSize && !this.less(index, right)) {
      return false;
    }

    return this.isMinHeap(left) && this.isMinHeap(right);
  }

  mapAdd(node: Type, i: number) {
    let set = this.map.get(node);

    if (!set) {
      set = new Set<number>();
      set.add(i);
      this.map.set(node, set);
    } else {
      set.add(i);
    }
  }

  mapSwap(nodeI: Type, nodeJ: Type, i: number, j: number) {
    const setI = this.map.get(nodeI)!;
    const setJ = this.map.get(nodeJ)!;
    setI?.delete(i);
    setJ?.delete(j);
    setI?.add(j);
    setJ?.add(i);
  }

  mapGet(element: Type) {
    const set = this.map.get(element);
    if (set) {
      return Array.from(set.values())[set.size - 1];
    }
    return null;
  }

  mapRemove(value: Type, index: number) {
    const set = this.map.get(value)!;
    set.delete(index);
    if (set.size === 0) {
      this.map.delete(value);
    }
  }
}
