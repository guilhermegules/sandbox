// O(n2)
function maxSubArray(nums: number[]): number {
    let bestSum = Number.NEGATIVE_INFINITY;
    let currentSum = 0;

    for (let i = 0; i < nums.length; i++) {
        currentSum = 0;
        for (let j = i; j < nums.length; j++) {
            currentSum += nums[j];
            bestSum = Math.max(bestSum, currentSum);
        }
    }

    return bestSum;
};

// O(n)
function maxSubArray2(nums: number[]): number {
    let bestSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        bestSum = Math.max(bestSum, currentSum); 
    }

    return bestSum;
};
