function romanToInt(s: string): number {
    const romanToDecimal = new Map()
                                .set("I", 1)
                                .set("V", 5)
                                .set("X", 10)
                                .set("L", 50)
                                .set("C", 100)
                                .set("D", 500)
                                .set("M", 1000);
    
    let result = 0;

    for (let i = 0; i < s.length; i++) {
        const next = romanToDecimal.get(s[i + 1]);
        const current = romanToDecimal.get(s[i]);
        if (next && current < next) {
            result += next - current;
            i++;
        } else {
            result += current;
        }
    }

    return result;
};
