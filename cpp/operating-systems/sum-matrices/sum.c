#include <stdio.h>

#define SIZE 3

int main() {
  int matA[SIZE][SIZE];
  int matB[SIZE][SIZE];
  int matC[SIZE][SIZE];
  int column = 0;
  int row = 0;
  int aux = 0;

  for(row = 0; row < SIZE; row++) {
    for(column = 0; column < SIZE; column++) {    
      matA[row][column] = 1;
      matB[row][column] = 3;
      matC[row][column] = 0;
    }
  }

  for(row = 0; row < SIZE; row++) {
    for(column = 0; column < SIZE; column++) {
      for(aux = 0; aux < SIZE; aux++) {
        matC[row][column] += matA[row][aux] * matB[aux][column];
      }
     }
   }

  // print matC
  for(row = 0; row < SIZE; row++) {
    for(column = 0; column < SIZE; column++) {
      printf("[%d]", matC[row][column]);
    }
    printf("\n");
  }

  return 1;     
}
