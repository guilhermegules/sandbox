// O(n)
function getLongestSubsequence(words: string[], groups: number[]): string[] {
    const result: string[] = [words[0]];
    let previous = 0;
    let current = 0;
    let next = 1;

    while (current < words.length) {
         if (groups[current] !== groups[next] && groups[next] !== groups[previous] && words[next]) {
            result.push(words[next]);
        } else if (groups[current] !== groups[next] && groups[next] === groups[previous] && words[current]) {
            result.push(words[current]);
        }

        current++;
        next++;
        previous++;
    }

    return result;
};

function getLongestSubsequence2(words: string[], groups: number[]): string[] {
    const result: string[] = [];
    
    let lastGroup: number | null = null;

    for (let i = 0; i < words.length; i++) {
        if (lastGroup === null || groups[i] !== lastGroup) {
            result.push(words[i]);
            lastGroup = groups[i];
        }
    }

    return result;
}

function getLongestSubsequence3(words: string[], groups: number[]): string[] {
    const result: string[] = [];

    let lastGroup: number | null = null;

    groups.forEach((group, index) => {
        if (lastGroup === null || group !== lastGroup) {
            result.push(words[index]);
            lastGroup = group;
        }
    });

    return result;
}


console.log(getLongestSubsequence3(["e", "a", "b"], [0, 0, 1])) // output ["e", "b"]
console.log(getLongestSubsequence3(["a", "b", "c", "d"], [1, 0, 1, 1])) // output ["a", "b", "c"]