function longestNiceSubstring(s: string): string {
    if (s.length < 2) return "";

    const uniqueLetters = new Set(s);

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        const hasCharUpperCaseAndLowerCase = uniqueLetters.has(char.toLowerCase()) && uniqueLetters.has(char.toUpperCase());

        if (hasCharUpperCaseAndLowerCase) {
            continue;
        }

        const left = longestNiceSubstring(s.slice(0, i));
        const right = longestNiceSubstring(s.slice(i + 1));

        return left.length >= right.length ? left : right;
    }

    return s;
};

function longestNiceSubstring2(s: string): string {
    let result = "";

    for (let i = 0; i < s.length; i++) {
        let lower = new Set<string>();
        let upper = new Set<string>();

        for (let j = i; j < s.length; j++) {
            const char = s[j];

            if (char === char.toLowerCase()) {
                lower.add(char);
            } else {
                upper.add(char.toLowerCase());
            }

            let isNice = true;
            for (const c of lower) {
                if (!upper.has(c)) {
                    isNice = false;
                    break;
                }
            }
            for (const c of upper) {
                if (!lower.has(c)) {
                    isNice = false;
                    break;
                }
            }

            if (isNice && j - i + 1 > result.length) {
                result = s.slice(i, j + 1);
            }
        }
    }

    return result;
};
