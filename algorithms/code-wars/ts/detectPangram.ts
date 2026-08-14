export const isPangram = (phrase: string): boolean => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const phraseLowerCase = phrase.toLowerCase().replace(/\.|\s/g, "");
  
  return [...alphabet].every(letter => phraseLowerCase.includes(letter));
};
