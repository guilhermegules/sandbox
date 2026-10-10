function lengthOfLongestSubstring(s: string): number {
   let maxLength = 0;
   for (let i = 0; i < s.length; i++) {
        const seen = new Set<string>();
        for (let j = i; j < s.length; j++) {
            if (seen.has(s[j])) break;

            seen.add(s[j]);
            maxLength = Math.max(maxLength, j - i + 1);
        }
   }

   return maxLength;
}; 

function lengthOfLongestSubstring2(s: string): number {
   const window = new Set();
   let left = 0;
   let maxLength = 0;

   for (let right = 0; right < s.length; right++) {
        let current = s[right];

        while (window.has(current)) {
            window.delete(s[left]);
            left++;
        }

        window.add(current);
        maxLength = Math.max(maxLength, right - left + 1);
   }

   return maxLength;
};  
