function getRow(rowIndex: number): number[] {
    if (rowIndex === 0) return [1];

    const pascalTriangle: number[][] = new Array(rowIndex + 1);

    pascalTriangle[0] = [1];
    pascalTriangle[1] = [1, 1];

    for (let i = 2; i < pascalTriangle.length; i++) {
        pascalTriangle[i] = [];
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                pascalTriangle[i][j] = 1;
                continue;
            }

            pascalTriangle[i][j] = pascalTriangle[i - 1][j] + pascalTriangle[i - 1][j - 1]
        }
    }

    return pascalTriangle[rowIndex];
};