function containsNearbyDuplicate(nums: number[], k: number): boolean {
    let containsDuplicate = false;

    for (let i = 0; i <= nums.length; i++) {
        for (let j = 1; j <= nums.length; j++) {
            if (nums[i] === nums[j] && i !== j && Math.abs(i - j) <= k) {
                containsDuplicate = true;
            }
        }
    }

    return containsDuplicate;
};

function containsNearbyDuplicate2(nums: number[], k: number): boolean {
    const window = new Set<number>();

    for (let i = 0; i < nums.length; i++) {
        if (window.has(nums[i])) {
            return true;
        }

        window.add(nums[i]);

        if (window.size > k) {
            window.delete(nums[i - k]);
        }
    }

    return false;
};
