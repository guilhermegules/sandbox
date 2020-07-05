#include <stdio.h>
#include <conio.h>
#define tam 30

main(){
	/*1. Escreva um programa que permita a leitura de um vetor de 30 números inteiros, e gere um segundo
	vetor com os mesmos dados, mas de maneira invertida, ou seja, o primeiro elemento ficará na última
	posição, o segundo na penúltima, e assim por diante.	*/
	
	
	int vet1[tam], vet2[tam], i , pos2 = tam - 1;
	
	for(i=0; i<tam; i++){
	vet1[i] = i;
	}
	for(i=0; i<tam; i++){
		printf("%i\n", vet1[i]);
	}
	
		for(i=29; i>=0; i--){
	vet2[pos2] = vet1[i];
	pos2--;
	}
	for(i=29; i>=0; i--){
		printf("%i\n", vet2[i]);
	}

}
