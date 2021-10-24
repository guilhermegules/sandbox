#include <stdio.h>
#include <stdlib.h>
#include <time.h>

/*
  * Deve ser gerado um conjunto com pelo menos 100 soluções aleatórias, sendo cada
  * uma representada pela tupla (x, y), onde x e y, por sua vez, podem assumir qualquer valor entre zero e um
  
  * O ponto R deve ser posicionado sempre em (1, 1); 

  * A dominância deve ser relativa a minimização nos dois eixos (ordenadas e abscissas). A
  * figura 2 mostra uma sugestão de implementação do teste de dominância entre duas
  * partículas A e B em relação as suas coordenadas (x, y).
  
  * O gráfico resultante deve ser plotado pelo aluno, de forma que seja possível
  * identificar-se claramente quais os pontos correspondentes a soluções não dominadas
  * e dominadas. 
*/

#define MAX_NUMBER_OF_REGISTERS 5

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

double getRPoint(double *numbers)
{
  for (int row = 0; row < MAX_NUMBER_OF_REGISTERS; row++)
  {
    for (int col = 0; col < MAX_NUMBER_OF_REGISTERS; col++)
    {
      if (row == 1 && col == 1)
      {
        return numbers[row * MAX_NUMBER_OF_REGISTERS + col];
      }
    }
  }
}

void printValues(double *numbers)
{
  for (int row = 0; row < MAX_NUMBER_OF_REGISTERS; row++)
  {
    for (int col = 0; col < MAX_NUMBER_OF_REGISTERS; col++)
    {
      printf(" %0.4f ", numbers[row * MAX_NUMBER_OF_REGISTERS + col]);
    }
    printf("\n");
  }
}

int main()
{
  srand(time(NULL));

  double *numbersX = (double *)malloc(sizeof(double) * MAX_NUMBER_OF_REGISTERS * MAX_NUMBER_OF_REGISTERS);
  double *numbersY = (double *)malloc(sizeof(double) * MAX_NUMBER_OF_REGISTERS * MAX_NUMBER_OF_REGISTERS);
  double rPoint = 0;

  if (numbersX == NULL)
  {
    printf("Error allocating numbersX variable!\n");
    exit(EXIT_FAILURE);
  }

  addValues(numbersX);

  printValues(numbersX);

  addValues(numbersY);

  printValues(numbersY);

  rPoint = getRPoint(numbersX);

  // TODO: fazer validações para definir retornos de pontos nos arquivos

  return 1;
}