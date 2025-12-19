const fs = require("fs");
const path = require("path");

function countXMas(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function validDiagonal(chars) {
    const word = chars.join("");
    return word === "MAS" || word === "SAM";
  }

  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (grid[r][c] === "A") {
        // Diagonals
        const diag1 = [grid[r - 1][c - 1], "A", grid[r + 1][c + 1]];
        const diag2 = [grid[r - 1][c + 1], "A", grid[r + 1][c - 1]];

        if (validDiagonal(diag1) && validDiagonal(diag2)) {
          count++;
        }
      }
    }
  }

  return count;
}

const inputPath = path.join(__dirname, "data.txt");
const fileContent = fs.readFileSync(inputPath, "utf8");
const grid = fileContent.trim().split("\n");

console.log("Total X-MAS found:", countXMas(grid));
