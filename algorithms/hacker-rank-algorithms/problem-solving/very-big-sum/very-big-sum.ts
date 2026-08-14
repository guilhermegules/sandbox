function veryBigSum(ar: number[]): number {
  return ar.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}
