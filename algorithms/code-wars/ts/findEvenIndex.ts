export function findEvenIndex(arr: number[]): number {
  const operations = new Set<number>();
  let evenIndex = -1;
  
  for (let i = 0; i < arr.length; i++) {
    const sumLeftSide = arr.slice(0, i).reduce((acc, l) => acc + l, 0);
    const sumRightSide = arr.slice(i + 1).reduce((acc, r) => acc + r, 0);

    operations.add(sumLeftSide + sumRightSide);
    
    if (sumLeftSide === sumRightSide && evenIndex === -1) {
      evenIndex = i;
    } 
  }
  
  if (Array.from(operations).every(operation => operation === 0)) return 0;
  
  return evenIndex;
}
