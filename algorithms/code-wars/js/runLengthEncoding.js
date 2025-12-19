const runLengthEncoding = (str) => {
  if (str.length === 0) return [];
  
  const result = [];
  let count = 1;
  let previousValue = str[0];
  
  for (let i = 1; i < str.length; i++) {
    if (str[i] === previousValue) {
      count++;
    } else {
      result.push([count, previousValue]);
      previousValue = str[i];
      count = 1;
    }
  }
  
  result.push([count, previousValue]);
  return result;
}
