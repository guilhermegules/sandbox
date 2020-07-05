#include <stdio.h>
#include <conio.h>

main(){
	/*1. Escreva um programa que leia um vetor de 10 posições e depois apresente este vetor em ordem
	inversa na tela.	*/
	int i, vet[10];
	for(i=9;i>0;i--){
	printf("Digite um valor: ");
	scanf("%i", &vet[i]);
	printf("%i", vet[i]);
	}
}
