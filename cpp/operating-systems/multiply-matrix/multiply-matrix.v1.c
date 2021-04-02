#include <stdio.h>

#define MATRIX_A_COLUMS 4
#define MATRIX_A_ROWS 3
#define MATRIX_B_COLUMS 3
#define MATRIX_B_ROWS 4
#define MATRIX_C_SIZE 4

void showMatrix(int rows, int colums, int matrix[rows][colums], char* title) {
  int row, column;

  printf(" %s \n", title);
  for(row = 0; row < rows; row++) {
    for(column = 0; column < colums; column++) {
      printf("[%d]", matrix[row][column]);
    }
    printf("\n");
  }
}

void fillMatrix(int rows, int colums, int matrix[rows][colums], int value) {
  int row, column;

   for(row = 0; row < rows; row++) {
    for(column = 0; column < colums; column++) {
      matrix[row][column] = value;
    }
    printf("\n");
  }
  printf("\n\n");
}

void makeMatrixMultiplication(int matA[MATRIX_A_ROWS][MATRIX_A_COLUMS], int matB[MATRIX_B_COLUMS][MATRIX_B_COLUMS], int matC[MATRIX_C_SIZE][MATRIX_C_SIZE]) {
  int row, column, aux;

  for(row = 0; row < MATRIX_C_SIZE; row++) {
    for(column = 0; column < MATRIX_C_SIZE; column++) {
      for(aux = 0; aux < MATRIX_C_SIZE; aux++) {
        matC[row][column] += matA[row == MATRIX_A_ROWS ? (MATRIX_A_ROWS - 1) : row][aux] * matB[aux][column == MATRIX_B_COLUMS ? (MATRIX_B_COLUMS - 1) : column];
      }
    }
  }
}

int main() {
  int matA[MATRIX_A_ROWS][MATRIX_A_COLUMS];
  int matB[MATRIX_B_COLUMS][MATRIX_B_COLUMS];
  int matC[MATRIX_C_SIZE][MATRIX_C_SIZE];
  int column = 0;
  int row = 0;
  int aux = 0;

  // Filling values
  fillMatrix(MATRIX_A_ROWS, MATRIX_A_COLUMS, matA, 1);
  fillMatrix(MATRIX_B_ROWS, MATRIX_B_COLUMS, matB, 3);
  fillMatrix(MATRIX_C_SIZE, MATRIX_C_SIZE, matC, 0);

  // Showing initial values
  showMatrix(MATRIX_A_ROWS, MATRIX_A_COLUMS, matA, "Matrix A");
  showMatrix(MATRIX_B_ROWS, MATRIX_B_COLUMS, matB, "Matrix B");
  showMatrix(MATRIX_C_SIZE, MATRIX_C_SIZE, matC, "Matrix C");

  // Making multiplication
  makeMatrixMultiplication(matA, matB, matC);

  // Show result
  showMatrix(MATRIX_C_SIZE, MATRIX_C_SIZE, matC, "Matrix C");
  return 1;     
}
