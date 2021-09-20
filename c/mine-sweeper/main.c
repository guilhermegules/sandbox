#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>
#include<time.h>

#include "./constants.h"

int open_area(int boardContent[HEIGHT][WIDTH], int boardView[HEIGHT][WIDTH], int column, int row)
{
  int accumulator = 0;

  if(boardView[row][column] == CLOSED && boardContent[row][column] == EMPTY) 
  {
    boardView[row][column] = OPENED;
    accumulator++;

    printf("\n%d", row);
    printf("\n%d", boardView[row - 1][column]);
    printf("\n%d\n", boardContent[row][column]);

    // Top 
    if(row > 0 && boardView[row - 1][column] == CLOSED) 
    { 
      accumulator += open_area(boardContent, boardView, column, row - 1); 
    } 

    // Bottom
    // if(row < (HEIGHT - 1) && boardView[row + 1][column] == CLOSED)
    // {
    //   accumulator += open_area(boardContent, boardView, column, row + 1); 
    // }

    // Right
    // if(column < (WIDTH - 1) && boardView[row][column + 1] == CLOSED)
    // {
    //   accumulator += open_area(boardContent, boardView, column + 1, row); 
    // }

    // Left
    // if(column > 0 && boardView[row][column - 1] == CLOSED)
    // {
    //   accumulator += open_area(boardContent, boardView, column - 1, row); 
    // }
  }

  return accumulator;
}

void insert_default_board_value(int boardContent[HEIGHT][WIDTH], int boardView[HEIGHT][WIDTH]) 
{
  for(int row = 0; row < HEIGHT; row++) 
  {
    for(int column = 0; column < WIDTH; column++) 
    {
      boardContent[row][column] = EMPTY;
      boardView[row][column] = CLOSED;
    }
  }
}

void bomb_randomizer(int boardContent[HEIGHT][WIDTH]) 
{
  int insertedBombs = 0;

  while (insertedBombs < BOMBS_QUANTITY)
  {
    int randomRow = rand() % WIDTH;
    int randomColumn = rand() % HEIGHT;

    if(!boardContent[randomRow][randomColumn] != BOMB) 
    {
      boardContent[randomRow][randomColumn] = BOMB;
      insertedBombs++;
    }
  }
}

void init_board(int boardContent[HEIGHT][WIDTH], int boardView[HEIGHT][WIDTH]) 
{
  int column, row;

  insert_default_board_value(boardContent, boardView);

  bomb_randomizer(boardContent);

  int bombsCount;

  for(row = 0; row < HEIGHT; row++) 
  {
    for(column = 0; column < WIDTH; column++) {
      if(boardContent[row][column] != BOMB) 
      {
        bombsCount = 0;

        // Top
        if(row > 0 && boardContent[row - 1][column] == BOMB) 
        {
          bombsCount++;
        }

        // Bottom
        if(row < (HEIGHT - 1) && boardContent[row + 1][column] == BOMB) 
        {
          bombsCount++;
        }

        // Right
        if(column < (WIDTH - 1) && boardContent[row][column + 1] == BOMB) 
        {
          bombsCount++;
        }

        // Left
        if(column > 0 && boardContent[row][column - 1] == BOMB) 
        {
          bombsCount++;
        }

        // Top right diagonal
        if(row > 0 && column < (WIDTH - 1) && boardContent[row - 1][column + 1] == BOMB) 
        {
          bombsCount++;
        }

        // Top left diagonal
        if(row > 0 && column > 0 && boardContent[row - 1][column - 1] == BOMB) 
        {
          bombsCount++;
        }

        // Bottom right diagonal
        if(row < (HEIGHT - 1) && column < (WIDTH - 1) && boardContent[row + 1][column + 1] == BOMB) 
        {
          bombsCount++;
        }

        // Bottom left diagonal
        if(row < (HEIGHT - 1) && column > 0 && boardContent[row + 1][column - 1] == BOMB) 
        {
          bombsCount++;
        }

        boardContent[row][column] = bombsCount;
      }
    }
  }
}

void show_board(int boardContent[HEIGHT][WIDTH], int boardView[HEIGHT][WIDTH], bool cheat) 
{
  int column, row;

  for(row = 0; row < WIDTH; row++) 
  {
    for(column = 0; column < HEIGHT; column++) 
    {
      if(boardView[row][column] == OPENED || cheat) {
        switch (boardContent[column][row])
        {
        case BOMB:
            printf("| # ");
          break; 
        case EMPTY: 
            printf("| . ");
          break;
        default:
            printf("| %d ", boardContent[column][row]);
          break;
        }
      }
      else 
      {
        printf("| + ");
      }      
    }
    printf("|\n");
  }
}

int main() 
{
  int boardContent[HEIGHT][WIDTH];
  int boardView[HEIGHT][WIDTH];

  // Define the seed of the rand function 
  // srand(time(NULL));

  init_board(boardContent, boardView);

  printf("Cheat table\n");

  show_board(boardContent, boardView, true);

  printf("Empty table\n");

  int count = open_area(boardContent, boardView, 0, 4);
  show_board(boardContent, boardView, false);

  printf("\n count :: %d\n", count);

  return 0;
}

/* 
  - Próximos passos, morrer ao clicar na bomba, morrer
  - Se clicar em um número apenas essa célula ser aberta
*/