export function solution(number: number): string {
  let romans = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let arabic = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let newRoman: string = "";
  if(number <= 0) return "";
  for(let i = 0; i < romans.length; i++) {
    while (number - arabic[i] >= 0) {
      newRoman += romans[i];
      number -= arabic[i];
    }
  }
  return newRoman;
}
