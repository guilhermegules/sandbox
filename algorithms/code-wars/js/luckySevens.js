function isPerfectCube(n) {
  const root = Math.round(Math.cbrt(n));
  return root ** 3 === n;
}

function isNumber(n) {
  return typeof n === "number";
}

function luckySevens(arr) {
  let luckyCount = 0;
  const rows = arr.length;
  const cols = arr[0].length;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (arr[i][j] === 7) {
        let sum = 0;
        const neighbors = [
          [i - 1, j], // up
          [i + 1, j], // down
          [i, j - 1], // left
          [i, j + 1]  // right
        ];
        
        for (const [neighborRow, neighborColumn] of neighbors) {
          if (neighborRow >= 0 && neighborRow < rows 
              && neighborColumn >= 0 && neighborColumn < cols
             && isNumber(arr[neighborRow][neighborColumn])) {
            sum += arr[neighborRow][neighborColumn]
          }
        }
        
        if (isPerfectCube(sum)) {
          luckyCount++;
        }
      }
    }
  }
  
  return luckyCount;
}
