// O(n)
class KthLargest {
    private k: number;
    private nums: number[];
    
    constructor(k: number, nums: number[]) {
        this.k = k;
        this.nums = nums.toSorted((a, b) => a - b);    
    }

    add(val: number): number {
        let i = 0;

        while (i < this.nums.length && this.nums[i] < val) {
            i++;
        }

        this.nums.splice(i, 0, val);

        return this.nums[this.nums.length - this.k];
    }
}

// O(log(n))
class KthLargest2 {
    private k: number;
    private nums: number[];
    
    constructor(k: number, nums: number[]) {
        this.k = k;
        this.nums = nums.toSorted((a, b) => a - b);    
    }

    add(val: number): number {
        let left = 0;
        let right = this.nums.length;

        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (this.nums[mid] < val) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        this.nums.splice(left, 0, val);

        return this.nums[this.nums.length - this.k];
    }
}
