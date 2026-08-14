// O(n)
function tribonacci(n: number): number {
    if (n === 0) return 0;
    if (n <= 2) return 1;
    
    let a = 0;
    let b = 1;
    let c = 1;

    for (let i = 3; i <= n; i++) {
        const next = a + b + c;
        a = b;
        b = c;
        c = next;
    }

    return c;
};

function tribonacci(n: number): number {
    if (n === 0) return 0;
    if (n <= 2) return 1;
    
    let a = 0;
    let b = 1;
    let c = 1;
    let i = 3;

    while (i <= n) {
        const next = a + b + c;
        a = b;
        b = c;
        c = next;
        i++;
    }

    return c;
};

function tribonacci(n: number): number {
    if (n === 0) return 0;
    if (n <= 2) return 1;
    
    let a = 0;
    let b = 1;
    let c = 1;
    let i = 3;

    do {
        const next = a + b + c;
        a = b;
        b = c;
        c = next;
        i++;
    } while (i <= n);

    return c;
};
