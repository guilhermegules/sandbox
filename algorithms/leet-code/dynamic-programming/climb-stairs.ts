// Time complexity = O(2^n)
function climbStairs1(n: number): number {
    if (n <= 2) return n;

    return climbStairs1(n - 1) + climbStairs1(n - 2);
};

// Time complexity O(n) Space complexity O(n)
function climbStairs2(n: number): number {
    if (n <= 2) return n;

    const stairs = new Array(n + 1);

    stairs[0] = 1;
    stairs[1] = 2;

    for (let i = 2; i < n; i++) {
        stairs[i] = stairs[i - 1] + stairs[i - 2];
    }

    return stairs[n - 1];
}

// Time complexity O(n) Space complexity O(1)
function climbStairs3(n: number): number {
    if (n <= 2) return n;

    let prev1 = 2;
    let prev2 = 1;

    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}