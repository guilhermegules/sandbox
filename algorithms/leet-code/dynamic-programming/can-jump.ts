function canJump(nums: number[]): boolean {
    let jump = nums[0];

    if (jump >= nums.length - 1) return true;

    for (let i = 0; i < nums.length; i++) {
        const index = nums.indexOf(jump);

        const r = [...nums.slice(index + 1)]

        if (jump >= r.length) {
            return true
        } else {
            jump = nums[jump];
        }
    }

    return false;
};
