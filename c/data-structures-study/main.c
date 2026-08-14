#include <stdio.h>
#include <stdlib.h>

#define N 3

int getIndex(int plan, int row, int column)
{
  return row * N + column + (N * N * plan);
}

void tab(int plan)
{
  for (int i = 0; i < plan; i++)
  {
    printf("\t");
  }
}

void showCube(int *cube)
{
  for (int plan = 0; plan < N; plan++)
  {
    printf("\n");
    tab(plan);
    printf("Plano %d\n", plan);
    for (int row = 0; row < N; row++)
    {
      tab(plan);
      for (int column = 0; column < N; column++)
      {
        printf(" %2d ", cube[getIndex(plan, row, column)]);
      }
      printf("\n");
    }
  }
}

int main()
{
  int row = 0, column = 0, plan = 0;
  int mainDiagonal = 0, secondaryDiagonal = 0;

  int *cube = (int *)malloc(N * N * N * sizeof(int));

  if (cube == NULL)
  {
    printf("\nErro alocando memória!\n");
    exit(EXIT_FAILURE);
  }

  // Fill the cube, front vision
  // left right, top bottom
  // front to back
  int count = 0;

  for (plan = 0; plan < N; plan++)
  {
    for (row = 0; row < N; row++)
    {
      for (column = 0; column < N; column++)
      {
        cube[getIndex(plan, row, column)] = ++count;
      }
    }
  }

  showCube(cube);

  for (plan = 0; plan < N; plan++)
  {
    for (int index = 0; index < N; index++)
    {
      mainDiagonal += cube[getIndex(plan, index, index)];
      secondaryDiagonal += cube[getIndex(plan, index, N - index - 1)];
    }
  }

  printf("\nPrincipal: %d", mainDiagonal);
  printf("\nSecundaria: %d", secondaryDiagonal);

  return 0;
}