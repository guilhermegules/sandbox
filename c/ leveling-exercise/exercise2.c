#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <stdbool.h>

int* bubble_sort (int array[], int numberOfValues) {
  int j, tmp;
  bool found = false;

  do {
      found = false;
      for(j = 0; j < numberOfValues - 1; j++) {
      if(array[j] > array[j + 1]) {
        tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
        found = true;
      }
    }
  } while(found);

  return array;
}

int main() {
  int n = 0, i = 0, pos = 0;
  bool found = false;

  printf("Type how many positions do you want on your array: ");
  scanf("%d", &n);

  int numbers[n];

  srand(time(NULL));

  while(pos < n) {
    found = false;
    int randomNumber = rand() % n * n;
    for(i = 0; i < pos; i++) {
      if(randomNumber == numbers[i]) {
        found = true;
        break;
      }
    }

    if(!found) {
      numbers[i] = randomNumber;
      pos++;
    } else {
      printf("%d\n", randomNumber);
    }
  }

  int* sortedValues = bubble_sort(numbers, n);

  for(int j = 0; j < n; j++) {
    printf("[%d]", sortedValues[j]);
  }

  return 0;
}