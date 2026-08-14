#include <stdio.h>
#define tam 20

/*7. Escreva um programa que leia um vetor de 20 posi��es inteiras e o coloque em ordem crescente,
utilizando a seguinte estrat�gia:
a. Selecione o elemento do vetor de 20 posi��es que apresenta o menor valor;
b. Troque este elemento pelo primeiro;
c. Repita estas opera��es envolvendo agora apenas os 19 elementos restantes (trocando o de
menor valor com a segunda posi��o), depois os 17, os 16 e assim por diante, at� restar um �nico
elemento, o maior deles.*/

main(){
	int vet[tam], j, i, menor, troca=0, reducao=0;
	
	for(i=0; i<tam; i++){
		printf("Digite um valor: ");
		scanf("%i", &vet[i]);
		
		if(vet[i]<menor){
			menor = vet[i];
		}
		troca = vet[0];
	}
	for(i=0;i<tam;i++){
		printf("Vetor: %i\n", vet[i]);
	}
	for(i=0;i<tam;i++){
		reducao = vet[i-1];
		printf("Reducao do vetor %i\n", reducao);
	}
	printf("Menor valor: %i\n", menor);
	printf("troca: %i", troca);
	
}
