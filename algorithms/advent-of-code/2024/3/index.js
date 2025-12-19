import fs from "fs";

const tokenDo = "do()";
const tokenDont = "don't()";
const tokenMul = "mul(";

const parseMultiplication = (token) => {
  const [x, y] = token.match(/\d+/g).map(Number);
  return x * y;
};

const multiplicationOfCorruptedData = (data) => {
  const results = [];
  let mulEnabled = true;

  const multiplicationRuleRegex = /(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g;

  const tokens = [...data.matchAll(multiplicationRuleRegex)];

  for (const [token] of tokens) {
    if (token === tokenDo) {
      mulEnabled = true;
    }

    if (token === tokenDont) {
      mulEnabled = false;
    }

    if (token.startsWith(tokenMul) && mulEnabled) {
      results.push(parseMultiplication(token));
    }
  }

  return results.reduce((sum, value) => sum + value, 0);
};

const corruptedText = fs.readFileSync("./text.txt", "utf-8");

console.log(multiplicationOfCorruptedData(corruptedText));
