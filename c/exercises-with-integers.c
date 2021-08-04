#include <stdio.h>
#include <stdlib.h>

void exercise1() {
	int numbers[100];
	int i;

	for (i = 0; i < 100; i++) {
		numbers[i] = i + 1;

		printf("[%d]\n", numbers[i] * 2);
	}
}

void exercise2() {
	int n = 12;
	int acc = 0;

	printf("Type a number: ");
	scanf("%d", &n);

	for (int i = 0; i <= n; i++) {
		acc += i;
	}

	printf("Sum with all values %d", acc);
}

void exercise3() {
	int n = 0;
	int i = 0;
	int odd = 1;

	printf("Type a number to receive all the odds numbers: ");
	scanf("%d", &n);
	printf("---------");
	
	while (i < n) {
		printf("\n%d\n", odd);
		odd += 2;
		i++;
	}
	
	printf("---------");
}

void exercise4() {
	int x = 0;
	int n = 0;
	int pow = 1;

	printf("Type your number: ");
	scanf("%d", &x);

	printf("Type a number for elevate your number: ");
	scanf("%d", &n);

	for (int i = 0; i < n; i++) {
		pow *= x;
	}

	printf("%d", pow);
}

void exercise5() {
	struct Disc {
		int quantity;
		int sold_date;
	} typedef Disc;

	Disc disc;
	disc.quantity = 0;
	disc.sold_date = 0;

	Disc all_sold_discs[10];

	for (int i = 0; i < 10; i++) {
		all_sold_discs[i].quantity = 10 * i;
		all_sold_discs[i].sold_date = i++;
	}

	for (int i = 0; i < 10; i++) {
		if (disc.quantity < all_sold_discs[i].quantity) {
			disc.quantity = all_sold_discs[i].quantity;
			disc.sold_date = all_sold_discs[i].sold_date;
		}
	}

	printf("\n \t Sold at day: %d \n \t Bigger quantity: %d", disc.sold_date, disc.quantity);
}

void exercise6() {
  int n = 10;
  int studentsGrades[n];
  int maxGrade = 100;
  int minGrade = 0;
  int biggerGrade = 0;

  for(int i = 0; i < n; i++) {
    studentsGrades[i] = (i + 1) * 2;
  }

  for(int i = 0; i < n; i++) {
    if(biggerGrade < studentsGrades[i]) {
      biggerGrade = studentsGrades[i];
    }
  }

  printf("%d", biggerGrade);
}

void exercise7() {
  int n = 10;
  int numbers[n];
  int evenSum = 0;

  for(int i = 0; i < n; i++) {
    numbers[i] = i;
  }

  for(int j = 0; j < n; j++) {
    if(numbers[j] % 2 == 0) {
      evenSum += numbers[j];
    }
  }

  printf("%d", evenSum);
}

int main() {
	// exercise1();
	// exercise2();
	// exercise3();
	// exercise4();
	// exercise5();
  // exercise6();
  exercise7();

	return 1;
}

