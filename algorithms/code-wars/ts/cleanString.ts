export function cleanString(s: string): string {
 const stack = [];
  for (const ch of s) {
      if (ch === '#') {
          stack.pop();
      } else {
          stack.push(ch);
      }
  }
  return stack.join('');
}
