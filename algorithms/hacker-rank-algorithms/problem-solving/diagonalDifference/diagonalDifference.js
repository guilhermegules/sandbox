/*
 * The function is expected to return an absolute INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */
function diagonalDifference(arr) {
    let leftToRightDiagonal = 0;
    let rightToLeftDiagonal = 0;

    for (let row = 0; row < arr.length; row++) {
        for (let column = 0; column < arr.length; column++) {
            if (row === column) {
                leftToRightDiagonal += arr[row][column];
            }

            if (row === (arr.length - column - 1)) {
                rightToLeftDiagonal += arr[row][column];
            }
        }
    }

    return Math.abs(leftToRightDiagonal - rightToLeftDiagonal);
}
