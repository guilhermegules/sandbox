#include <stdio.h>
#include <math.h>
#define l 5
#define c 5

main(){
	int m[l][c];
	int i,j, soma=0;
	
	for(i=0; i<4; i++){ // utilizamos a variável i para acessar as posiçõees da linha
		for(j=0; j<5; j++) { // utilizamos a variável j para acessar as posições da colunas
		  printf("Digite um valor: ");
		  scanf("%d", &m[i][j]); // lê os valores e armazena na matriz m
	  }
	}
	
  for(j=0; j<l; j++){
		soma = soma + m[2][j];		
	}
		
	printf("%i", soma);
}
