#include <stdio.h>
#include <conio.h>
#define tam 5

/*7. Escreva um programa que leia um vetor de 20 posições inteiras e o coloque em ordem crescente,
utilizando a seguinte estratégia:
a. Selecione o elemento do vetor de 20 posições que apresenta o menor valor;
b. Troque este elemento pelo primeiro;
c. Repita estas operações envolvendo agora apenas os 19 elementos restantes (trocando o de
menor valor com a segunda posição), depois os 17, os 16 e assim por diante, até restar um único
elemento, o maior deles.*/

main(){
	int vet[tam], j, i, aux=0, menor, troca=0, reducao=0;
	
	for(i=0; i<tam; i++){
		printf("Digite um valor: ");
		scanf("%i", &vet[i]);
		
		for(j=0;j<vet[-1];j++){
			if(vet[j]>vet[j+1]){
				aux=vet[j];
				vet[j] = vet[j+1];
				vet[j+1] = aux;
			}
		}
		/*if(vet[i]<menor){
			menor = vet[i];
		}
		troca = vet[0];*/
	}
	printf("Vetor: %i\n", vet[i]);
}
