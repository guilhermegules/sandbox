function findLHS(nums: number[]): number {
    const frequency = new Map<number, number>();

    for (const num of nums) {
        frequency.set(num, (frequency.get(num) ?? 0) + 1);
    }

    let maxLen = 0;

    for (const [num, count] of frequency.entries()) {
        if (frequency.has(num + 1)) {
            maxLen = Math.max(maxLen, count + frequency.get(num + 1));
        }
    }

    return maxLen;
};

function findLHS2(nums: number[]): number {
    const frequency = new Map<number, number>();

    nums.forEach((num) => frequency.set(num, (frequency.get(num) || 0) + 1));

    let maxLen = 0;

    [...frequency.entries()].forEach(([num, count]) => {
        if (frequency.has(num + 1)) {
            maxLen = Math.max(maxLen, count + frequency.get(num + 1));
        }
    });

    return maxLen;
};

function findLHS3(nums: number[]): number {
    const frequency = new Map<number, number>();

    nums.forEach((num) => frequency.set(num, (frequency.get(num) || 0) + 1));

    let maxLen = 0;

    for (const [num, count] of frequency.entries()) {
        const frequencyValue = frequency.get(num + 1);
        if (frequencyValue) {
            maxLen = Math.max(maxLen, count + frequencyValue);
        }
    }

    return maxLen;
};
