function decrypt(code: number[], k: number): number[] {
    const n = code.length;
    const result: number[] = new Array(n).fill(0);

    if (k === 0) return result;

    const extend = [...code, ...code];

    let windowSum = 0;
    let start: number;
    let end: number;

    if (k > 0) {
        start = 1;
        end = k;
    } else {
        start = n + k;
        end = n - 1;
    }

    for (let i = start; i <= end; i++) {
        windowSum += extend[i];
    }

    for  (let i = 0; i < n; i++) {
        result[i] = windowSum;
        windowSum -= extend[start];
        start++;
        end++;
        windowSum += extend[end];
    }

    return result;
};
