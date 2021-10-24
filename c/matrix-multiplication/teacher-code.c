
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define N 2000

void PreencheMatriz(int Altura, int Largura, int *M, int Valor)
{
	int L, C; // Linha e Coluna

	for(L=0; L < Altura; L++)
	{
		for(C=0; C < Largura; C++)
		{
			M[L * Altura + C] = Valor;
		}
	}
}

void MostraMatriz(int Altura, int Largura, int *M, char *Titulo)
{
	int L, C;

	printf(" %s \n", Titulo);
	for(L=0; L < Altura; L++)
	{
		for(C=0; C < Largura; C++)
		{
			printf(" %2d ", M[L * Altura + C]);
		}
		printf("\n");
	}

}

int main()
{
	int *Ma = (int*)malloc( sizeof(int) * N * N);
	if( Ma == NULL )
	{
		printf("Erro alocando matriz A!\n");
		exit ( EXIT_FAILURE );
	}

	int *Mb = (int*)malloc( sizeof(int) * N * N);
	if( Mb == NULL )
	{
		printf("Erro alocando matriz B!\n");
		exit ( EXIT_FAILURE );
	}

	int *Mc = (int*)malloc( sizeof(int) * N * N);
	if( Mc == NULL )
	{
		printf("Erro alocando matriz C!\n");
		exit ( EXIT_FAILURE );
	}

	PreencheMatriz(N, N, Ma, 1);
	PreencheMatriz(N, N, Mb, 2);
	PreencheMatriz(N, N, Mc, 0);

	//MostraMatriz(N, N, Ma, "Matriz A");
	//MostraMatriz(N, N, Mb, "Matriz B");
	//MostraMatriz(N, N, Mc, "Matriz C");

	int L, C, K;
	clock_t timeCount;

	timeCount = clock();

	for(L=0; L < N; L++)
	{
		for(C=0; C < N; C++)
		{
			for(K=0; K<N; K++)
			{
				Mc[L * N + C] += Ma[L * N + K] * Mb[K * N + C];
			}
		}
	}
	//sleep(10);
	timeCount = clock() - timeCount;

	double execTime = ((double)timeCount) / CLOCKS_PER_SEC;


	//MostraMatriz(N, N, Mc, "Matriz C");

	printf("Tempo de execucao: %f segundos\n", execTime);

	return 0;
}
