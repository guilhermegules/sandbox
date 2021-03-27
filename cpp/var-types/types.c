#include <stdio.h>

// C don't have boolean type. Usually, it is defined using the following notion:
#define BOOL char
#define FALSE 0
#define TRUE 1

void main() {
  int a = 0, b = 1, c = 2, d = 3, e = 4;

  a = b - c + d * e;
  
  printf("%d", a);

  // Constant value
  const double PI = 3.14;
  // PI = 2.1 // ERROR
}