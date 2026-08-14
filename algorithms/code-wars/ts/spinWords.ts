export function spinWords(words: string): string {
    const reverse = (word: string) => {
      let reversedWord = "";
      
      for (let i = word.length - 1; i >= 0; i--) {
        reversedWord += word[i];
      }
      
      return reversedWord;
    } 
  
    return words.split(" ").map(w => w.length >= 5 ? reverse(w) : w).join(" ");
}
