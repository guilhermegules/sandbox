/**
 * Problem:
  Implement a function named factorial that has one parameter: an integer, n. It must return the value of n!(i.e.,  factorial).
 */

function factorial(n) {
  if (n === 0 || n === 1) return 1;

  for (let i = n - 1; i >= 1; i--) {
    n = n * i;
  }
  return n;
}
