export class UnionFind {
  // The number of elements in this union find
  private size: number;

  // Used to track the size of each of the component
  private sizeComponents: number[];

  // id[i] points to the parent of i, if id[i] === i then i is a root node
  private id: number[];

  // Tracks the number of components in the union find
  private componentsNumber: number;

  constructor(size: number) {
    if (size <= 0) {
      throw new Error("Size <= 0 is not allowed");
    }

    this.size = size;
    this.componentsNumber = size;

    this.sizeComponents = new Array(size);
    this.id = new Array(size);

    for (let i = 0; i < size; i++) {
      this.id[i] = i; // Link to itself (self root)
      this.sizeComponents[i] = 1; // Each component is originally of size one
    }
  }

  // Find which component/set "p" belegos to, takes amortized constant time.
  find(p: number): number {
    // Find the root of the component/set
    let root = p;

    while (root !== this.id[root]) {
      root = this.id[root]!;
    }

    // Compress the path leading back to the root.
    // Doing this operation is called "path compression"
    // and is what gives us amortized time complexity.
    while (p !== root) {
      const next = this.id[p];
      this.id[p] = root;
      p = next!;
    }

    return root;
  }

  // This is an alternative recursive formulation for the find method
  public findRecursive(p: number): number {
    if (p === this.id[p]) return p;

    return (this.id[p] = this.findRecursive(this.id[p]!));
  }

  // Return whether or not the elements "p" and
  // "q" are in the same component/set
  isConnected(p: number, q: number) {
    return this.find(p) === this.find(q);
  }

  // Return the size of the components/size "p" belongs to
  componentSize(p: number) {
    return this.sizeComponents[this.find(p)];
  }

  getSize() {
    return this.size;
  }

  getComponents() {
    return this.componentsNumber;
  }

  // Unify the components/sets containing elements "p" and "q"
  unify(p: number, q: number) {
    const root1 = this.find(p);
    const root2 = this.find(q);

    if (root1 === root2) return;

    // Merge smaller component/set into the larger one
    if (this.sizeComponents[root1]! < this.sizeComponents[root2]!) {
      this.sizeComponents[root2]! += this.sizeComponents[root1]!;
      this.id[root1] = root2;
    } else {
      this.sizeComponents[root1]! += this.sizeComponents[root2]!;
      this.id[root2] = root1;
    }

    // Since the roots found are different we know that the
    // Number of components/sets has decreased by one
    this.componentsNumber--;
  }
}
