/**
 * O(n2)
 */
function generate(numRows: number): number[][] {
    if (numRows === 1) return [[1]];

    const pascalTriangle: number[][] = new Array(numRows);

    pascalTriangle[0] = [1];
    pascalTriangle[1] = [1, 1];

    for (let i = 2; i < numRows; i++) {
        pascalTriangle[i] = [];
        for (let j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                pascalTriangle[i][j] = 1;
                continue;
            }

            pascalTriangle[i][j] = pascalTriangle[i - 1][j] + pascalTriangle[i - 1][j - 1]
        }
    }

    return pascalTriangle;
};

/**
 * O(n2)
 */
function generate2(numRows: number): number[][] {
    const pascalTriangle: number[][] = [];

    for (let i = 0; i < numRows; i++) {
        const row = new Array(i + 1).fill(1);

        for (let j = 1; j < i; j++) {
            row[j] = pascalTriangle[i - 1][j] + pascalTriangle[i - 1][j - 1]
        }

        pascalTriangle.push(row);
    }

    return pascalTriangle;
};

/**
 * O(n2)
 */
function generateFp(numRows: number): number[][] {
    return Array.from({ length: numRows }).reduce<number[][]>((triangle, _, i) => {
        const row = Array(i + 1).fill(1);

        for (let j = 1; j < i; j++) {
            row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        }

        triangle.push(row);
        return triangle;
    }, [])
};
