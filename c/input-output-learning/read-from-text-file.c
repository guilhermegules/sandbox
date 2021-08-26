#include<stdio.h>
#include<stdlib.h>

int main() {
  int number;
  FILE *file_p;

  if((file_p = fopen("./example-2.txt", "r")) == NULL) {
    printf("Error on opening file!");
    exit(0);
  }

  fscanf(file_p, "%d", &number);

  printf("Value of number = %d", number);
  fclose(file_p);

  return 1;
}