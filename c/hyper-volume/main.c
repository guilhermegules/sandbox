#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define WRITE_FILE "w"
#define MAX_NUMBER_OF_REGISTERS 100

typedef struct Points
{
  double x;
  double y;
} Point;

double randomNumber()
{
  return (double)rand() / (double)RAND_MAX;
}

void addValues(double *numbers)
{
  for (int row = 0; row < MAX_NUMBER_OF_REGISTERS; row++)
  {
    for (int col = 0; col < MAX_NUMBER_OF_REGISTERS; col++)
    {
      numbers[row * MAX_NUMBER_OF_REGISTERS + col] = randomNumber();
    }
  }
}

void printValues(double *numbers)
{
  for (int row = 0; row < MAX_NUMBER_OF_REGISTERS; row++)
  {
    for (int col = 0; col < MAX_NUMBER_OF_REGISTERS; col++)
    {
      printf(" %0.4f; ", numbers[row * MAX_NUMBER_OF_REGISTERS + col]);
    }
    printf("\n");
  }
}

double dominantCalculation(int NUMBERS_RESULT_COLUMNS, double resultNumbers[MAX_NUMBER_OF_REGISTERS][NUMBERS_RESULT_COLUMNS], double *numbers, FILE *file_p)
{
  int row, col;
  Point pointA;
  Point pointB;

  // Add values on result number matrix
  // Following comparing the dominance between values
  for (row = 0; row < MAX_NUMBER_OF_REGISTERS; row++)
  {
    for (col = 0; col < MAX_NUMBER_OF_REGISTERS; col++)
    {
      pointA.x = numbers[row * MAX_NUMBER_OF_REGISTERS + col];
      pointB.x = numbers[row * MAX_NUMBER_OF_REGISTERS + col + 1];
      pointA.y = numbers[row + 1 * MAX_NUMBER_OF_REGISTERS + col];
      pointB.y = numbers[row * MAX_NUMBER_OF_REGISTERS + col + 1];

      if (
          ((pointA.x < pointB.x) && (pointA.y < pointB.y)) ||
          ((pointA.x < pointB.x) && (pointA.y == pointB.y)) ||
          ((pointA.x == pointB.x) && (pointA.y < pointB.y)))
      {
        resultNumbers[row][0] = pointA.x;
        resultNumbers[row][1] = pointA.y;
      }

      if (((pointA.x > pointB.x) && (pointA.y > pointB.y)) ||
          ((pointA.x > pointB.x) && (pointA.y == pointB.y)) ||
          ((pointA.x == pointB.x) && (pointA.y > pointB.y)))
      {
        resultNumbers[row][0] = pointB.x;
        resultNumbers[row][1] = pointB.y;
      }
    }
  }

  // Saving result numbers values on file
  for (row = 0; row < MAX_NUMBER_OF_REGISTERS; row++)
  {
    for (col = 0; col < NUMBERS_RESULT_COLUMNS; col++)
    {
      fprintf(file_p, " %0.4f; ", resultNumbers[row][col]);
    }
    fprintf(file_p, "\n");
  }
}

void saveNumbers(char *filename, double *numbers)
{
  FILE *file_p = fopen(filename, WRITE_FILE);
  const int NUMBERS_RESULT_COLUMNS = 2;
  double numbersResult[MAX_NUMBER_OF_REGISTERS][NUMBERS_RESULT_COLUMNS];

  if (file_p == NULL)
  {
    printf("Error opening file\n");
    exit(EXIT_FAILURE);
  }

  dominantCalculation(NUMBERS_RESULT_COLUMNS, numbersResult, numbers, file_p);

  fclose(file_p);
}

int main()
{
  srand(time(NULL));

  double *numbers = (double *)malloc(sizeof(double) * MAX_NUMBER_OF_REGISTERS * MAX_NUMBER_OF_REGISTERS);

  if (numbers == NULL)
  {
    printf("Error allocating numbers variable!\n");
    exit(EXIT_FAILURE);
  }

  addValues(numbers);

  printValues(numbers);

  saveNumbers("hyper-volume.csv", numbers);

  return EXIT_SUCCESS;
}