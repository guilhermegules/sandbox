#include <stdio.h>
#include <conio.h>
#define tam 5
/*6. Escreva um programa que leia um vetor com 20 posições. Este vetor deverá conter apenas números
inteiros e positivos. Após, ele deve permitir que o usuário informe um valor para que o programa verifique
se este valor está presente no vetor ou não. A interação com o usuário terminará quando este informar
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
