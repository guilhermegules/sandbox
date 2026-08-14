class MyHashSet {
    private values: number[] = []

    constructor() {
        
    }

    add(key: number): void {
        this.values.push(key);
    }

    remove(key: number): void {
        this.values = this.values.filter(v => v !== key);
    }

    contains(key: number): boolean {
        return this.values.some(v => v === key);
    }
}

class MyHashSet2 {
    private buckets: number[][];
    private size: number;

    constructor() {
        this.size = 1000;
        this.buckets = Array.from({ length: this.size }, () => []);
    }

    private hash(key: number): number {
        return key % this.size;
    }

    add(key: number): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket.includes(key)) {
            bucket.push(key);
        }
    }

    remove(key: number): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        this.buckets[index] = bucket.filter(v => v !== key);
    }

    contains(key: number): boolean {
        const index = this.hash(key);
        return this.buckets[index].includes(key);
    }
}
