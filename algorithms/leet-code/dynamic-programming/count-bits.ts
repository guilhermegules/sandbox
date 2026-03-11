function countBits(n: number): number[] {
    const bits = [];

    function decimalToBinary(decimal: number): string {
        if (decimal === 0) return "0";
        let binary = "";
        let num = Math.floor(decimal);

        while (num > 0) {
            // Get the remainder (last bit)
            const remainder = num % 2;
            // Prepend the remainder to the binary string
            binary = remainder + binary;
            // Divide the number by 2 for the next iteration
            num = Math.floor(num / 2);
        }

        return binary;
    }

    for (let i = 0; i <= n; i++) {
        const bit = decimalToBinary(i).split("").reduce((acc, value) => {
            if (value === "1") {
                acc += 1;
            }

            return acc;
        }, 0);
        bits.push(bit);
    }

    return bits;
};

function countBits2(n: number): number[] {
    const bits = new Array(n + 1).fill(0);

    for (let i = 0; i < bits.length; i++) {
        // i >> 1 Shift right, remove the last bit.
        // 6 = 110
        // 6 >> 1 = 11 = 3
        // (i & 1) Checks if the last bit is 1. If number is odd, last bit is 1. If number is even, last bit is 0.
        // 5 = 101
        // 101
        // &
        // 001
        // ---
        // 001 = 1
        bits[i] = bits[i >> 1] + (i & 1);
    }

    return bits;
};

console.log(countBits(5));
console.log(countBits2(5));