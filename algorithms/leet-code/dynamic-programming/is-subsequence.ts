// Time complexity O(n2)
function isSubsequence(s: string, t: string): boolean {
    let cleanString = new Set<string>();
    let tList = t.split("");
    let sList = s.split("");

    for (let letter of tList) {
        for (let letter2 of sList) {
            if (letter2 === letter) {
                cleanString.add(letter);
            }
        }
    }

    return Array.from(cleanString.values()).join("") === s;
};

// Time O(n) Space O(1)
// Using pointers technique
function isSubsequence2(s: string, t: string): boolean {
    let i = 0;
    let j = 0;

    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i++;
        }
        j++;
    }

    return i === s.length;
};

console.log(isSubsequence("abc", "ahbgdc"));
console.log(isSubsequence2("abc", "ahbgdc"));
console.log(isSubsequence2("axc", "ahbgdc"));
