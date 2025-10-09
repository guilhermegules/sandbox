import { UnionFind } from "./union-find";

describe("UnionFind", () => {
  test("constructor should initialize correctly", () => {
    const uf = new UnionFind(5);

    expect(uf.getSize()).toBe(5);
    expect(uf.getComponents()).toBe(5);

    // Each node should be its own parent initially
    for (let i = 0; i < 5; i++) {
      expect(uf.find(i)).toBe(i);
      expect(uf.componentSize(i)).toBe(1);
    }
  });

  test("constructor should throw error for size <= 0", () => {
    expect(() => new UnionFind(0)).toThrow("Size <= 0 is not allowed");
    expect(() => new UnionFind(-1)).toThrow("Size <= 0 is not allowed");
  });

  test("find() should perform path compression", () => {
    const uf = new UnionFind(5);

    // manually connect 0→1→2→3
    (uf as any).id[0] = 1;
    (uf as any).id[1] = 2;
    (uf as any).id[2] = 3;

    const root = uf.find(0);
    expect(root).toBe(3);

    // path compression check: now id[0], id[1], id[2] should all point directly to 3
    expect((uf as any).id[0]).toBe(3);
    expect((uf as any).id[1]).toBe(3);
    expect((uf as any).id[2]).toBe(3);
  });

  test("findRecursive() should return same as find()", () => {
    const uf = new UnionFind(4);
    uf.unify(0, 1);
    expect(uf.findRecursive(0)).toBe(uf.find(1));
  });

  test("isConnected() should detect connectivity", () => {
    const uf = new UnionFind(5);

    expect(uf.isConnected(0, 1)).toBe(false);
    uf.unify(0, 1);
    expect(uf.isConnected(0, 1)).toBe(true);
    expect(uf.isConnected(1, 2)).toBe(false);
  });

  test("unify() should merge components correctly", () => {
    const uf = new UnionFind(5);

    uf.unify(0, 1);
    uf.unify(1, 2);

    expect(uf.isConnected(0, 2)).toBe(true);
    expect(uf.getComponents()).toBe(3); // started with 5, now unified twice
  });

  test("unify() should not decrease component count when already connected", () => {
    const uf = new UnionFind(3);

    uf.unify(0, 1);
    const before = uf.getComponents();
    uf.unify(0, 1); // unify same set again

    expect(uf.getComponents()).toBe(before);
  });

  test("componentSize() should return correct sizes after unions", () => {
    const uf = new UnionFind(6);

    uf.unify(0, 1);
    uf.unify(2, 3);
    uf.unify(1, 2);

    expect(uf.componentSize(0)).toBe(4); // 0,1,2,3 connected
    expect(uf.componentSize(4)).toBe(1);
  });
});
