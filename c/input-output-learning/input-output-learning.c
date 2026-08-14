#include<stdio.h>
#include<stdlib.h>

int main() {

  int number;
  FILE *file_p;

  file_p = fopen("./test-file.txt", "w");

  if(file_p == NULL) {
    printf("ERROR! trying to read the file results in a error");
    exit(0);
  }

  printf("Enter a number: ");
  scanf("%d", &number);

  fprintf(file_p, "%d", number);
  fclose(file_p);

  return 1;
}