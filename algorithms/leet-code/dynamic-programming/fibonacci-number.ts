// O(n2)
function fib(n: number): number {
    if (n === 0) return 0;
    if (n <= 2) return 1;

    return fib(n - 1) + fib(n - 2);
};

// O(n)
function fib2(n: number, memo: Record<number, number> = {}): number {
    if (n === 0) return 0;
    if (n <= 2) return 1;
    if (memo[n]) return memo[n];

    memo[n] = fib2(n - 1, memo) + fib2(n - 2, memo)

    return memo[n];
};

// O(n) time O(1) space
function fib3(n: number): number {
    if (n === 0) return 0;
    if (n <= 2) return 1;

    let prev = 1;
    let current = 1;

    for (let i = 3; i <= n; i++) {
        const next = prev + current;
        prev = current;
        current = next;
    }

    return current;
};

function fib4(n: number): number {
    if (n <= 2) return 1;
    let current = 1;
    let prev = 1;
    let i = 3;

    while (i <= n) {
        const next = current + prev;
        prev = current;
        current = next;
        i++;
    }

    return current;
};

console.log(fib(4))
console.log(fib2(4))
console.log(fib3(4))
console.log(fib4(4))