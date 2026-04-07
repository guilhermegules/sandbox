// Brute force O(log(n))
function isPowerOfTwo(n: number, exponent = 0): boolean {
    if (exponent === n) return false;
    if (Math.pow(2, exponent) === n) return true;
    return isPowerOfTwo(n, exponent + 1);
};

// O(log(n)) but reducing the numbers of tries by dividing the expoent by two instead of try each one
function isPowerOfTwo(n: number): boolean {
    if (n <= 0) return false;
    if (n === 1) return true;
    if (n % 2 !== 0) return false;

    return isPowerOfTwo(n / 2);
}
