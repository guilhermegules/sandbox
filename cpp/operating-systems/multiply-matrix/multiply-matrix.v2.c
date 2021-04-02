/*
  * Multiplicação de matrizes
  * Guilherme Gules Moreira
  * 01/04/2021 
  * 
  * M [linha,coluna] -> v[linha * largura + coluna]
  * M [linha, coluna] -> v[coluna * altura + coluna]
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MATRIX_A_COLUMS 4
#define MATRIX_A_ROWS 3
#define MATRIX_B_COLUMS 3
#define MATRIX_B_ROWS 4
#define MATRIX_C_ROWS 4
#define MATRIX_C_COLUMS 4

void showMatrix(int height, int width, int* matrix, char* title) {
  int row, column;

  printf(" %s \n", title);
  for(row = 0; row < height; row++) {
    for(column = 0; column < width; column++) {
      printf("[%d]", matrix[row * height + column]);
    }
    printf("\n");
  }
}

void fillMatrix(int height, int width, int* matrix, int value) {
  int row, column;

   for(row = 0; row < height; row++) {
    for(column = 0; column < width; column++) {
      matrix[row * height + column] = value;
    }
    printf("\n");
  }
  printf("\n\n");
}

int main() {
  int* matrixA = (int*)malloc(sizeof(int) * MATRIX_A_ROWS * MATRIX_A_COLUMS);
  int* matrixB = (int*)malloc(sizeof(int) * MATRIX_B_ROWS * MATRIX_B_COLUMS);
  int* matrixC = (int*)malloc(sizeof(int) * MATRIX_C_ROWS * MATRIX_C_COLUMS);
  
  if (matrixA == NULL || matrixB == NULL ||  matrixC == NULL) {
    printf("\nError allocating memory! \n");
    exit(EXIT_FAILURE);
  }

  fillMatrix(MATRIX_A_ROWS, MATRIX_A_COLUMS, matrixA, 1);
  fillMatrix(MATRIX_B_ROWS, MATRIX_B_COLUMS, matrixB, 3);
  fillMatrix(MATRIX_C_ROWS, MATRIX_C_COLUMS, matrixC, 0);

  showMatrix(MATRIX_A_ROWS, MATRIX_A_COLUMS, matrixA, "Matriz A");
  showMatrix(MATRIX_B_ROWS, MATRIX_B_COLUMS, matrixB, "Matriz B");
  showMatrix(MATRIX_C_ROWS, MATRIX_C_COLUMS, matrixC, "Matriz C");

  int row, column, aux, option;

  printf("Qual modalidade voce deseja? (1/2)");
  scanf("%d", &option);

  switch (option) {
  case 1:
    for(row = 0; row < MATRIX_C_ROWS; row++) {
      for(column = 0; column < MATRIX_C_COLUMS; column++) {
        for(aux = 0; aux < MATRIX_A_COLUMS; aux++) {
          matrixC[row * MATRIX_C_COLUMS + column] += matrixA[row * MATRIX_A_COLUMS + aux] * matrixB[aux * MATRIX_B_ROWS + column];
        }
      }
    }
    break;
  case 2:
    for(row = 0; row < MATRIX_C_ROWS; row++) {
      for(column = 0; column < MATRIX_C_COLUMS; column++) {
        for(aux = 0; aux < MATRIX_A_COLUMS; aux++) {
          matrixC[row * MATRIX_C_ROWS + column] += matrixA[row * MATRIX_A_ROWS + aux] * matrixB[aux * MATRIX_B_COLUMS + column];
        }
      }
    }
  break;
  default:
    printf("Código inválido");
    exit(0);
    break;
  }
  
  showMatrix(MATRIX_C_ROWS, MATRIX_C_COLUMS, matrixC, "Matriz C resultante");
  return 1;
}