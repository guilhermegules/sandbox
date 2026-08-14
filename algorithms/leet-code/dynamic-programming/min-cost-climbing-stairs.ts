// Time O(n) Space O(1)
function minCostClimbingStairs(cost: number[]): number {
    let prev2 = cost[0];
    let prev1 = cost[1];

    for (let i = 2; i < cost.length; i++) {
        const current = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = current;
    }

    return Math.min(prev1, prev2);
};

function minCostClimbingStairs2(cost: number[]): number {
    let prev2 = cost[0];
    let prev1 = cost[1];
    let pointer = 2;

    while (pointer < cost.length) {
        const current = cost[pointer] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = current;
        pointer++;
    }

    return Math.min(prev1, prev2);
}

// Naive recursion O(n2)
function minCostClimbingStairs3(cost: number[]): number {
    function dfs(pointer: number): number {
        if (pointer === 0) return cost[0];
        if (pointer === 1) return cost[1];

        return cost[pointer] + Math.min(dfs(pointer - 1), dfs(pointer - 2));
    }

    const n = cost.length;

    return Math.min(dfs(n - 1), dfs(n - 2));
}

// Recursion with memo O(n)
function minCostClimbingStairs4(cost: number[]): number {
    const memo = new Map<number, number>()

    function dfs(pointer: number): number {
        if (pointer === 0) return cost[0];
        if (pointer === 1) return cost[1];

        if (memo.has(pointer)) {
            return memo.get(pointer)!;
        }

        const result = cost[pointer] + Math.min(dfs(pointer - 1), dfs(pointer - 2));

        memo.set(pointer, result);

        return result;
    }

    const n = cost.length;

    return Math.min(dfs(n - 1), dfs(n - 2));
}

console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));
console.log(minCostClimbingStairs2([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));
console.log(minCostClimbingStairs3([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));
console.log(minCostClimbingStairs4([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));