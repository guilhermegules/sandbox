#include <stdlib.h>
#include <stdio.h>
#include <time.h>

#define WIDTH 20
#define HEIGHT 20
#define NUMBER_RANGE 99

/**
 * Qual é o maior produto de quatro números adjacentes na mesma direção (acima abaixo, esquerda, direita ou em diagonal) nesta grade 20x20?
 * Escreva um código em ANSI C que encontre a resposta. Este código deve ser capaz de ser executado com quaisquer 
 * outras grades de valores 20 x 20 com valores inteiros positivos entre 1 e 99 fornecidos pelo usuário. 
 * 
 * Após o código ser criado, resposta: Qual a complexidade temporal (Big O) do algoritmo gerado? E em relação ao consumo de 
 * memória? R: Como temos loops aninhados para realizar a lógica para a obtenção do produto, pode-se dizer que a complexidade é quadrática O(n2)
 * */

int generate_random_number()
{
  int randomNumber;

  do
  {
    randomNumber = rand() % NUMBER_RANGE;
  } while (randomNumber <= 0);

  return randomNumber;
}

void insert_default_values(int numbers[WIDTH][HEIGHT])
{
  int row, column;

  int tmp = 0;

  for (row = 0; row < HEIGHT; row++)
  {
    for (column = 0; column < WIDTH; column++)
    {
      numbers[row][column] = generate_random_number();
    }
  }
}

void print_numbers(int numbers[HEIGHT][WIDTH])
{
  int row, column;

  for (row = 0; row < HEIGHT; row++)
  {
    for (column = 0; column < WIDTH; column++)
    {
      printf("[%2d]", numbers[row][column]);
    }
    printf("\n");
  }
}

void insert_numbers_manually(int numbers[HEIGHT][WIDTH])
{
  int row, column;

  for (int row = 0; row < HEIGHT; row++)
  {
    for (int column = 0; column < WIDTH; column++)
    {
      printf("Digite o seu número: ");
      scanf("%d", &numbers[row][column]);
    }
  }
}

long product_numbers_helper(int numbers[HEIGHT][WIDTH])
{
  long product = 1;
  int counter = 1;
  int row, column;

  for (int row = 0; row < HEIGHT; row++)
  {
    for (int column = 0; column < WIDTH; column++)
    {
      // Top
      if (row > 0)
      {
        counter++;
        product *= numbers[row - 1][column];
      }

      // Bottom
      if (row < (HEIGHT - 1))
      {
        counter++;
        product *= numbers[row + 1][column];
      }

      // Right
      if (column < (WIDTH - 1))
      {
        counter++;
        product *= numbers[row + 1][column];
      }

      // Left
      if (column > 0)
      {
        counter++;
        product *= numbers[row][column - 1];
      }

      // Top right diagonal
      if (row > 0 && column < (WIDTH - 1))
      {
        counter++;
        product *= numbers[row - 1][column + 1];
      }

      // Top left diagonal
      if (row > 0 && column > 0)
      {
        counter++;
        product *= numbers[row - 1][column - 1];
      }

      // Bottom right diagonal
      if (row < (HEIGHT - 1) && column < (WIDTH - 1))
      {
        counter++;
        product *= numbers[row + 1][column + 1];
      }

      // Bottom left diagonal
      if (row < (HEIGHT - 1) && column > 0)
      {
        counter++;
        product *= numbers[row + 1][column - 1];
      }

      if (counter == 4)
        return product;
    }
  }
}

int main()
{
  srand(time(NULL));

  int numbers[HEIGHT][WIDTH];
  long product = 0;
  int counter = 0;
  int option;

  printf("Você deseja inserir os números ou prefere utilizar números randomicos? \n (1) - Inserir \n (2) - Randômicos\n");

  scanf("%d", &option);

  switch (option)
  {
  case 1:
    insert_numbers_manually(numbers);
    print_numbers(numbers);
    break;
  case 2:
    insert_default_values(numbers);
    print_numbers(numbers);
    break;
  default:
    printf("Opção inválida, finalizando...");
    exit(1);
    break;
  }

  product = product_numbers_helper(numbers);

  printf("\nPropduto gerado: %ld\n", product);

  return 0;
}