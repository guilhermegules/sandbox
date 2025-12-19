import fs from "node:fs";

let calibrationValues = null;

try {
  calibrationValues = fs.readFileSync("./input.txt", "utf8").split("\n");
} catch (err) {
  console.error(err);
}

function sumAllCalibration(calibrationValues) {
  const list = [];

  calibrationValues.forEach((value) => {
    const map = new Map();
    value.split("").forEach((char) => {
      if (isNaN(Number(char))) return;

      if (map.has("firstValue")) {
        map.set("lastValue", char);
        return;
      }

      map.set("firstValue", char);
    });

    const result = joinMapValues(map);

    list.push(result);
  });

  const result = list.reduce((acc, value) => acc + Number(value), 0);

  return result;
}

function joinMapValues(map) {
  let joined = "";

  map.forEach((value) => {
    if (!map.has("lastValue")) {
      joined += value;
    }
    joined += value;
  });

  return joined;
}

console.log(sumAllCalibration(calibrationValues));
