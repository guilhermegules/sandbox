#include <stdio.h>
#define tam 5
/*6. Escreva um programa que leia um vetor com 20 posiçoes. Este vetor devera conter apenas numeros
inteiros e positivos. Apas, ele deve permitir que o usuario informe um valor para que o programa verifique
se este valor esta presente no vetor ou não. A interação com o usuario terminar quando este informar
um valor negativo.
9*/
main(){
	int vet[tam], pesquisa, i;
	for(i=0;i<tam;i++){
		printf("Digite um valor: ");
		scanf("%i", &vet[i]);
	}
	while(pesquisa>=0){
		printf("Qual valor deseja pesquisar? ");
		scanf("%i", &pesquisa);
			if(pesquisa=vet[i]){
				printf("O numero pesquisado foi encontrado: %i\n", pesquisa);
			}
	}
}
