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
  const int SIZE = 10;
  int numbers[SIZE][SIZE];

  /**
   * Get the main and secondary diagonals
   * 
   * Loop size = 100 if numbers[10][10]
   * */ 
  for(int x = 0; x < SIZE * SIZE; x++) {
    int row = x / SIZE;
    int col = x % SIZE;

    numbers[row][col] = 0;

    if(row == col) {
      numbers[row][col] = 1;
    }

    if(col == SIZE - 1 - row) {
      numbers[row][col] = 1;
    }
  }

  showMatrix(SIZE, SIZE, numbers);

  return 0;
}