let word = "hello";

// Not allowed
// word[0] = "H"
console.log("----STRINGS START----");
word = "H" + word.slice(1);
console.log(word);

console.log("abc".toUpperCase());
console.log("abc".toLowerCase());
console.log("hello world".includes("world"));
console.log("typescript".substring(0, 4));
console.log("a,b,c".split(","));

function areAnagrams(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  const normalize = (value: string) =>
    value.toLowerCase().split("").sort().join("");

  return normalize(a) === normalize(b);
}

console.log(areAnagrams("listen", "silent"));
console.log(areAnagrams("hello", "world"));

function isPalindrome(value: string): boolean {
  const clean = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = clean.split("").reverse().join("");
  return clean === reversed;
}

console.log(isPalindrome("racecar"));
console.log(isPalindrome("Was it a car or a cat I saw"));
console.log(isPalindrome("hello"));

// Naive substring search
function containsPattern(text: string, pattern: string): boolean {
  for (let i = 0; i <= text.length - pattern.length; i++) {
    if (text.slice(i, i + pattern.length) === pattern) {
      return true;
    }
  }

  return false;
}

console.log(containsPattern("hello world", "world"));
console.log(containsPattern("typescript", "java"));

// Trie, tree like structure for efficient prefix searches
class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;

    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }
}

const trie = new Trie();
trie.insert("hello");
trie.insert("helium");

console.log("----TRIE TESTS----");

console.log(trie.search("hello"));
console.log(trie.search("hel"));
console.log(trie.startsWith("hel"));

console.log("----STRINGS END----");
