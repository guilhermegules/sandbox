// https://www.hackerrank.com/challenges/kangaroo/problem?isFullScreen=true
function kangaroo(x1: number, v1: number, x2: number, v2: number): string {
  if (v1 === v2) {
    return x1 === x2 ? 'YES' : 'NO';
  }
  
  const n = (x2 - x1) / (v1 - v2);
  
  return n >= 0 && Number.isInteger(n) ? 'YES' : 'NO';
}
