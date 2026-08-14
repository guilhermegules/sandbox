// https://www.hackerrank.com/challenges/between-two-sets/problem?isFullScreen=true
function getTotalX(a: number[], b: number[]): number {
  const factors = new Set<number>();  
    
  function greatestCommonDivider(a: number, b: number) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
  }
    
  function leastCommonMultiple(a: number, b: number) {
    return (a * b) / greatestCommonDivider(a, b);
  }
 
  let l = a.reduce((acc, val) => leastCommonMultiple(acc, val));
  
  let g = b.reduce((acc, val) => greatestCommonDivider(acc, val));

  for (let x = l; x <= g; x += l) {
    if (g % x === 0) {
        factors.add(x)
    }
  }
  
  return factors.size;
}
