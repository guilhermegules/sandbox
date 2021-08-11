#include <stdio.h>
#include <stdlib.h>

int* bubble_sort (int array[], int numberOfValues) {
  int i, j, tmp;

  for(i = numberOfValues - 1; i > 0; i--) {
    for(j = 0; j < i; j++) {
      if(array[j] < array[j + 1]) {
        tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
  }

  return array;
}

int main() {
  const int NUMBER_OF_VALUES = 3;
  int value1 = 0, value2 = 0, value3 = 0;
  int average = 0;
  int numbers[NUMBER_OF_VALUES];

  printf("Type three numbers: ");
  
  for(int i = 0; i < NUMBER_OF_VALUES; i++) {
    scanf("%d", &numbers[i]);
  }

  for(int i = 0; i < NUMBER_OF_VALUES; i++) {
    average += numbers[i];
  }

  average /= NUMBER_OF_VALUES;

  printf("Average of our three numbers: %d\n", average);

  int* sortedValues = bubble_sort(numbers, NUMBER_OF_VALUES);

  for(int i = 0; i < NUMBER_OF_VALUES; i++) {
    printf("%d,", sortedValues[i]);
  }

  return 1;
}