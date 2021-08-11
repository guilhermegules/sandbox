#include <stdio.h>
#include <stdlib.h>

void showMatrix(int rows, int colums, int matrix[rows][colums]) {
  int row, column;

  for(row = 0; row < rows; row++) {
    for(column = 0; column < colums; column++) {
      printf("[%d]", matrix[row][column]);
    }
    printf("\n");
  }
}

int main() {
  const int n = 10;
  int numbers[n][n];

  // Populating matrix
  for(int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      numbers[i][j] = 0;
    }
  }

  // printf("%lu", sizeof(numbers)));
  // printf("%lu", sizeof(numbers[0]));
  // printf("%lu", sizeof(numbers[0][0]));
  // printf("%lu", sizeof(numbers) / sizeof(numbers[0]));
  // printf("%lu", sizeof(numbers[0]) / sizeof(numbers[0][0]));

  /**
   * Size of matrix 10
   * 
   * sizeof(numbers) = 400
   * sizeof(numbers[0]) = 40
   * sizeof(numbers[0][0]) = 10
   * 
   * SIZE_ROWS = 400 / 40 = 10
   * SIZE_COLUMNS = 40 / 10 = 10
   * 
   * numbers[10][10]
   * */
  const int SIZE_ROWS = sizeof(numbers) / sizeof(numbers[0]);
  const int SIZE_COLUMNS = sizeof(numbers[0]) / sizeof(numbers[0][0]);

  // printf("row - %d\n", 99 / SIZE_COLUMNS);
  // printf("col - %d\n", 99 % SIZE_COLUMNS);
  // printf("Loop size - %d\n", SIZE_ROWS * SIZE_COLUMNS);

  /**
   * Get the main and secondary diagonals
   * 
   * Loop size = 100 if numbers[10][10]
   * */ 
  for(int x = 0; x < SIZE_ROWS * SIZE_COLUMNS; x++) {
    int row = x / SIZE_COLUMNS;
    int col = x % SIZE_COLUMNS;

    if(row == col) {
      numbers[row][col] = 1;
    }
  }

  showMatrix(SIZE_ROWS, SIZE_COLUMNS, numbers);

  return 1;
}