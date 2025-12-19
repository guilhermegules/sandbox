import fs from "fs";
import readline from "readline";

async function readFile(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  try {
    const reader = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    const result = [];

    for await (const chunk of reader) {
      const parsed = chunk
        .trim()
        .split("\n")
        .flatMap((line) =>
          line
            .trim()
            .split(" ")
            .filter((line) => line !== " ")
            .map(Number)
        );
      result.push(parsed);
    }
    return result;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }
}

function isIncreasing(array) {
  return array.every(
    (data, index, list) => index === 0 || data > list[index - 1]
  );
}

function isDecreasing(array) {
  return array.every(
    (data, index, list) => index === 0 || data < list[index - 1]
  );
}

function isSafe(array) {
  const posibleSteps = [1, 2, 3];

  for (let index = 1; index < array.length; index++) {
    const stepCalculation = Math.abs(array[index] - array[index - 1]);

    if (!posibleSteps.includes(stepCalculation)) return false;
  }

  const isListIncreasing = isIncreasing(array);
  const isListDecreasing = isDecreasing(array);

  if (isListIncreasing && isListDecreasing) return false;

  return isListIncreasing || isListDecreasing;
}

function checkSafe(array) {
  if (isSafe(array)) return true;

  for (let i = 0; i < array.length; i++) {
    const arrayWithoutOneItem = array.slice(0, i).concat(array.slice(i + 1));

    if (isSafe(arrayWithoutOneItem)) return true;
  }

  return false;
}

async function main() {
  try {
    const data = await readFile("./data.txt");

    const filteredData = data.filter(checkSafe);
    console.log(filteredData.length);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
