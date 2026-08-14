#include <stdio.h>

main(){
	int m[4][5];
	int i, j;
	for(i = 0; i < 4; i++) { // utilizamos a variável i para acessar as posições da linha
		for(j = 0; j < 5; j++) { // utilizamos a variável j para acessar as posições da colunas
      printf("Digite um valor: ");
      scanf("%d", &m[i][j]); // lê os valores e armazena na matriz m
      printf("%d\n", m[i][j]);
		}
		printf("\n");
	}
}
