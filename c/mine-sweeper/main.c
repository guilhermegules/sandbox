#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>
#include<time.h>

// Board config
#define HEIGHT 10
#define WIDTH 10
#define BOMBS_QUANTITY 30

// Content state
#define CLOSE 0
#define OPEN 1
#define FLAG 2

// Cell content
#define BOMB -1

void insert_default_board_value(int boardContent[HEIGHT][WIDTH], int boardView[HEIGHT][WIDTH]) 
{
  for(int row = 0; row < HEIGHT; row++) 
  {
    for(int column = 0; column < WIDTH; column++) 
    {
      boardContent[row][column] = 0;
    }
  }
}

void bomb_randomizer(int boardContent[HEIGHT][WIDTH]) 
{
  int insertedBombs = 0;

  while (insertedBombs < BOMBS_QUANTITY)
  {
    int randomRow = rand() % (WIDTH - 1);
    int randomColumn = rand() % (HEIGHT - 1);

    if(!boardContent[randomColumn][randomRow] != BOMB) 
    {
      boardContent[randomColumn][randomRow] = BOMB;
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

void show_board(int boardContent[HEIGHT][WIDTH], int boardView[HEIGHT][WIDTH]) 
{
  int column, row;

  for(column = 0; column < HEIGHT; column++) 
  {
    for(row = 0; row < WIDTH; row++) 
    {
      switch (boardContent[column][row])
      {
      case BOMB:
          printf("| # ");
        break;
      case 0: 
          printf("| . ");
        break;
      default:
          printf("| %d ", boardContent[column][row]);
        break;
      }
    }
    printf("|\n");
  }
}

int main() 
{
  int boardContent[HEIGHT][WIDTH];
  int boardView[HEIGHT][WIDTH];

  // Define the seed of rand function 
  srand(time(NULL));

  init_board(boardContent, boardView);

  show_board(boardContent, boardView);

  return 0;
}