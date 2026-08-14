import inputData from "./input.json" with { type: "json" };

function historianHysteria(list1, list2) {
  const orderedList1 = list1.toSorted();
  const orderedList2 = list2.toSorted();

  const distanceBetweenNumbers = [];
  const similarityBeetweenLists = orderedList1.map(number => number * orderedList2.filter(number2 => number2 === number).length);

  for (let i = 0; i < orderedList1.length; i++) {
    const distance = Math.abs(orderedList1[i] - orderedList2[i]);
    distanceBetweenNumbers.push(distance);
  }

  const totalDistance = distanceBetweenNumbers.reduce(
    (total, distance) => total + distance,
    0
  );

  const totalScore = similarityBeetweenLists.reduce((total, score) => total + score, 0)

  return { totalDistance, totalScore };
}

const list1 = inputData.list1;
const list2 = inputData.list2;

console.log(historianHysteria(list1, list2));
