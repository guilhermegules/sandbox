#include <stdio.h>

void main() {
  int var = 5;

  printf("Value of var: %d\n", var);

  // Getting the address using & operator
  printf("Address of var: %p\n", &var);

  // Pointer syntax, here declaring a pointer and a variable
  int* pointerVarC, varC;
  int* myPointer;

  varC = 5;
  pointerVarC = &varC;

  printf("pointerVarC: %p - Pointer to a varC variable: %p\n ", pointerVarC, &varC);
  printf("varC: %d - Get a value through a pointer: %d\n", varC, *pointerVarC);
}