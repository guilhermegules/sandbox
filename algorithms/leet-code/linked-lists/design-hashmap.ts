class MyHashMap {
    private hashMap = {}

    constructor() {
        
    }

    put(key: number, value: number): void {
        this.hashMap[key] = value;
    }

    get(key: number): number {
        return this.hashMap[key] ?? -1;
    }

    remove(key: number): void {
        this.hashMap[key] = null;
    }
}
