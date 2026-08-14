function longestPalindrome(s: string): string {
    let right = 0;
    let left = 0;
    let start = 0;
    let end = 0;

    for (let i = 0; i < s.length; i++) {
        // Odd length
        left = i;
        right = i;

        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }

        let currentLength = right - left - 1;
        if (currentLength > end) {
            start = left + 1;
            end = currentLength;
        }

        // Even length
        left = i;
        right = i + 1;

        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }

        currentLength = right - left - 1;
        if (currentLength > end) {
            start = left + 1;
            end = currentLength;
        }
    }

    return s.substring(start, start + end);
};
