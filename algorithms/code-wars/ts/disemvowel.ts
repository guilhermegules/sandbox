export class Kata {
  static disemvowel(str: string) {
    const removedLetters = str.replace(/(a|i|e|o|u|O|A|U|I|E)/g, "");
    return removedLetters;
  }
}
