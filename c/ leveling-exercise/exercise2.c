#include <stdio.h>
#include <stdlib.h>

int* bubble_sort (int array[], int numberOfValues) {
  int i, j, tmp;

  for(i = numberOfValues - 1; i > 0; i--) {
    for(j = 0; j < i; j++) {
      if(array[j] > array[j + 1]) {
        tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
  }

  return array;
}

int main() {
  int n, i = 0, acc = 0;

  printf("Type how many positions do you want on your array: ");
  scanf("%d", &n);

  int numbers[n];

  while(i < n) {
    acc += 2;
    numbers[i] = acc * 2;

    if(numbers[i] < numbers[i + 1]) {
      numbers[i] = acc * 10;
    }

    i++;
  }

  int* sortedValues = bubble_sort(numbers, n);

  for(int j = 0; j < n; j++) {
    printf("%d, ", sortedValues[j]);
  }

  return 1;
}