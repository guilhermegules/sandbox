#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define HEIGHT 10
#define WIDTH 10

typedef struct
{
  int coordX;
  int coordY;
} point_t;

void clearBoard(char board[HEIGHT][WIDTH])
{
  int row, col;

  for (row = 0; row < HEIGHT; row++)
  {
    for (col = 0; col < WIDTH; col++)
    {
      board[row][col] = '.';
    }
  }
}

void showBoard(char board[HEIGHT][WIDTH])
{
  int row, col;

  for (row = 0; row < HEIGHT; row++)
  {
    printf("%2d | ", row);

    for (col = 0; col < WIDTH; col++)
    {
      printf(" %c ", board[row][col]);
    }
    printf("\n");
  }

  printf("     ");

  for (col = 0; col < WIDTH; col++)
  {
    printf(" %d ", col);
  }
}

int main()
{
  char board[HEIGHT][WIDTH];

  clearBoard(board);

  point_t originPoint, destinyPoint;

  originPoint.coordX = 2;
  originPoint.coordY = 8;

  destinyPoint.coordX = 2;
  destinyPoint.coordY = 2;

  board[originPoint.coordY][originPoint.coordX] = 'O';
  board[destinyPoint.coordY][destinyPoint.coordX] = 'D';

  showBoard(board);

  // int distancyPythagoras = sqrt((abs(originPoint.coordY - destinyPoint.coordY) * abs(originPoint.coordY - destinyPoint.coordY)) + (abs(originPoint.coordX - destinyPoint.coordX) * abs(originPoint.coordX - destinyPoint.coordX)));

  // printf("\n Distância pitagoras: %d \n", distancyPythagoras);

  float distancyManhattan = abs(originPoint.coordX - destinyPoint.coordX) + abs(originPoint.coordY - destinyPoint.coordY);

  printf("\nDistancia Manhattan: %2f\n", distancyManhattan);

  float incX = abs(originPoint.coordX - destinyPoint.coordX) / distancyManhattan;
  float incY = abs(originPoint.coordY - destinyPoint.coordY) / distancyManhattan;

  printf("::: incX %2f ::: incY %2f \n", incX, incY);

  float x = originPoint.coordX;
  float y = originPoint.coordY;
  int i;

  if (originPoint.coordX > destinyPoint.coordX)
  {
    incX *= -1;
  }

  if (originPoint.coordY > destinyPoint.coordY)
  {
    incY *= -1;
  }

  for (i = 0; i < distancyManhattan; i++)
  {
    y += incY;
    x += incX;

    board[(int)y][(int)x] = '*';

    printf(":::X = %2f :::Y = %2f ||| :::intX = %d :::intY = %d \n", x, y, (int)x, (int)y);
  }

  board[originPoint.coordY][originPoint.coordX] = 'O';
  board[destinyPoint.coordY][destinyPoint.coordX] = 'D';

  showBoard(board);

  // Desafio o deslocamento entre origem e destino deve ser senoide(curvas)

  return 1;
}