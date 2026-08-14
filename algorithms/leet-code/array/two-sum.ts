// O(n)
function twoSum(nums: number[], target: number): number[] {
    let result: number[] = [];

    let pointer1 = 0;
    let pointer2 = 1;

    while (pointer1 < nums.length) {
        if (pointer1 !== pointer2 && nums[pointer1] + nums[pointer2] === target) {
            result = [pointer1, pointer2];
        } 
        
        if (pointer2 + 1 === nums.length) {
            pointer1++;
            pointer2 = 0;
        } else {
            pointer2++;
        }
    }

    return result;
};

// O(n2)
function twoSum2(nums: number[], target: number): number[] {
    let result: number[] = [];

    for (let i = 0; i < nums.length; i++) {
        for (let j = 1; j < nums.length; j++) {
            if (i !== j && nums[j] + nums[i] === target) {
                result = [i, j];
            }
        }
    }

    return result;
};
