// O(n)
function jump(nums: number[]): number {
    const n = nums.length - 1;
    let jumps = 0;
    let currentEnd = 0;
    let farValue = 0;

    for (let i = 0; i < n; i++) {
        farValue = Math.max(farValue, i + nums[i]);

        if (i === currentEnd) {
            jumps++;
            currentEnd = farValue;
        }
    }

    return jumps;
};

// O(n2)
function jump2(nums: number[]): number {
    const n = nums.length;
    const dp = new Array(n).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (j + nums[j] >= i) {
                dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
    }

    return dp[n - 1];
}

// O(n2)
function jump3(nums: number[]): number {
    const memo = new Map<number, number>();
    const n = nums.length;

    function dfs(i: number): number {
        if (i >= n - 1) return 0;
        if (memo.has(i)) return memo.get(i)!;

        let minJumps = Infinity;

        for (let step = 1; step <= nums[i]; step++) {
            minJumps = Math.min(minJumps, 1 + dfs(i + step));
        }

        memo.set(i, minJumps);
        return minJumps;
    }

    return dfs(0);
}

// O(n2)
function jump4(nums: number[]): number {
    const n = nums.length;
    const queue: number[] = [0];
    const visited = new Set<number>([0]);
    let jumps = 0;

    while (queue.length > 0) {
        let size = queue.length;

        while (size--) {
            const i = queue.shift()!;

            if (i === n - 1) return jumps;

            for (let step = 1; step <= nums[i]; step++) {
                const next = i + step;
                if (next < n && !visited.has(next)) {
                    visited.add(next);
                    queue.push(next);
                }
            }
        }

        jumps++;
    }

    return jumps;
}

