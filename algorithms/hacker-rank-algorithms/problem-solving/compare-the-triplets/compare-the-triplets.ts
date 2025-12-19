function compareTriplets(a: number[], b: number[]): number[] {
  const points = [0, 0];

  a.forEach((number, index) => {
    if (number === b[index]) return;

    if (number > b[index]) {
      points[0] += 1;
      return;
    }

    points[1] += 1;
  });

  return points;
}
