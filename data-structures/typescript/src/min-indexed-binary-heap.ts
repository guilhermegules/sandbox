import { MinIndexedDHeap } from "./min-indexed-d-heap";

export class MinIndexedBinaryHeap<T> extends MinIndexedDHeap<T> {
  constructor(maxSize: number, comparator: (a: T, b: T) => number) {
    super(2, maxSize, comparator);
  }
}
