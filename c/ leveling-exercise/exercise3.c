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
  int n = 0, m = 0, count = 0;

  printf("Type how big will be our matrix: (rows, columns) ");
  scanf("%d %d", &n, &m);

  int matrix[n][m];

  for(int i = 0; i < n; i++) {
    for(int j = 0; j < m; j++) {
      matrix[i][j] = count;
      count++;
    }
  }

  showMatrix(n, m, matrix);

  return 1;
}