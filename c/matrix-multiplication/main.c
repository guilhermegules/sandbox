#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define N 100

void fillMatrix(int height, int width, int *matrix, int value)
{
    int row, col;

    for(row = 0; row < height; row++)
    {
        for(col = 0; col < width; col++)
        {
            matrix[row * height + col] = value;
        }
    }
}

void printMatrix(int height, int width, int *matrix, char *title)
{
    int row, col;

    printf(" %s \n", title);
    for(row = 0; row < height; row++)
    {
        for(col = 0; col < width; col++)
        {
            printf(" %2d ", matrix[row * height + col]);
        }
        printf("\n");
    }
}


void matrixMultiplication(int *matrixA, int *matrixB, int *matrixC)
{
    int row, col, k;

    for(row = 0; row < N; row++)
    {
        for(col = 0; col < N; col++)
        {
            for(k = 0; k < N; k++)
            {
                matrixC[row * N + col] += matrixA[row * N + k] * matrixB[k * N + col];
            }
        }
    }
}


int main()
{
    int *mA = (int*)malloc(sizeof(int) * N * N);

    if(mA == NULL)
    {
        printf("Error allocating matrix A\n");
        exit(EXIT_FAILURE);
    }

    int *mB = (int*)malloc(sizeof(int) * N * N);

    if(mB == NULL)
    {
        printf("Error allocating matrix B\n");
        exit(EXIT_FAILURE);
    }

    int *mC = (int*)malloc(sizeof(int) * N * N);

    if(mC == NULL)
    {
        printf("Error allocating matrix C\n");
        exit(EXIT_FAILURE);
    }

    fillMatrix(N, N, mA, 1);
    fillMatrix(N, N, mB, 2);
    fillMatrix(N, N, mC, 0);

    // printMatrix(N, N, mA, "Matrix A");
    // printMatrix(N, N, mB, "Matrix B");
    // printMatrix(N, N, mC, "Matrix C");

    clock_t timeCount;

	timeCount = clock();

	matrixMultiplication(mA, mB, mC);

    timeCount -= clock();

    double execTime = ((double)timeCount) / CLOCKS_PER_SEC;

    // printMatrix(N, N, mC, "Matrix C");

    printf("Execution time: %f seconds \n", execTime);

    return 0;
}
