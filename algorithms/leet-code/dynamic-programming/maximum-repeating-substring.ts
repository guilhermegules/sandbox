// O(n2)
function maxRepeating(sequence: string, word: string): number {
  let maxRepeat = 0;

  for (let i = 0; i < sequence.length; i++) {
    if (i + 1 === sequence.length) continue;
    let word2 = "";

    for (let j = 0; word2.length < word.length; j++) {
      word2 += sequence[i + j] + sequence[i + 1 + j];
    }

    if (word2 === word) {
      maxRepeat++;
    }
  }

  return maxRepeat;
}

function maxRepeating2(sequence: string, word: string): number {
  let maxRepeat = 0;

  function splitIntoChunks() {
    return Array.from({ length: sequence.length - word.length + 1 }, (_, i) =>
      sequence.slice(i, i + word.length),
    );
  }

  for (const chunk of splitIntoChunks()) {
    if (chunk === word) {
      maxRepeat++;
    }
  }

  return maxRepeat;
}

function maxRepeating3(sequence: string, word: string): number {
  function splitIntoChunks() {
    return Array.from({ length: sequence.length - word.length + 1 }, (_, i) =>
      sequence.slice(i, i + word.length),
    );
  }

  const maxRepeat = splitIntoChunks().reduce((max, chunk) => {
    if (chunk === word) return (max += 1);
    return max;
  }, 0);

  return maxRepeat;
}

function maxRepeating4(sequence: string, word: string): number {
  let k = 0;
  let repeated = word;

  while (sequence.includes(repeated)) {
    k++;
    repeated += word;
  }

  return k;
}

function maxRepeating5(sequence: string, word: string): number {
  let max = 0;

  for (let i = 0; i <= sequence.length - word.length; i++) {
    let count = 0;

    while (sequence.slice(i + count * word.length, i + (count + 1) * word.length) === word) {
        count++;
    }

    max = Math.max(max, count);
  }

  return max;
}

// O(n)
function maxRepeating6(sequence: string, word: string): number {
  const n = sequence.length;
  const m = word.length;
  const dp = new Array(n).fill(0);

  let max = 0;

  for (let i = m - 1; i < n; i++) {
    if (sequence.slice(i - m + 1, i + 1) === word) {
        dp[i] = 1;

        if (i >= m) {
            dp[i] += dp[i - m];
        }

        max = Math.max(max, dp[i]);
    }
  }

  return max;
}

console.log(maxRepeating6("aaabaaaabaaabaaaabaaaabaaaabaaaaba", "aaaba"));
console.log(maxRepeating6("ababc", "ba"));
console.log(maxRepeating6("ababc", "ac"));
