#include <stdio.h>
#include <stdlib.h>

struct ThreeNumbers {
  int number1, number2, number3;
};

int main() {

  int number;
  struct ThreeNumbers numbers;
  FILE *file_p;

  if((file_p = fopen("./example-binary.bin", "wb")) == NULL) {
    printf("Error on opening file");
    exit(0);
  }

  for(number = 0; number < 5; number++) {
    numbers.number1 = number;
    numbers.number2 = 5 * number;
    numbers.number3 = 5 * number + 1;
    fwrite(&numbers, sizeof(struct ThreeNumbers), 1, file_p);
  }

  if ((file_p = fopen("./example-binary.bin","rb")) == NULL){
    printf("Error on opening file");
    exit(1);
  }

  for(number = 0; number < 5; number++) {
    fread(&numbers, sizeof(struct ThreeNumbers), 1, file_p); 
    printf("n1: %d\nn2: %d\nn3: %d\n", numbers.number1, numbers.number2, numbers.number3);
  }

  fclose(file_p);

  return 1;
}