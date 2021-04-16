#include <stdio.h>

main(){
	//Algoritmo para ler a quantidade de números inseridos
	
	int num1, num_negativo, num_par, total;
	
	do{
		printf("Digite um numero: \n");
		scanf("%i", &num1);
		if(num1 < 0){
			num_negativo = num_negativo + 1;
		}
		else(num1 % 2 != 0);
			num_par = num_par + 1;
		total = total + 1; 
	}
	while(num1!=0);
	printf("Quantidade de numeros digitados %i: \n", total);
	printf("Quantidade de numeros pares digitados %i: \n", num_par);
	printf("Quantidade de numeros de numeros negativos digitados %i: \n", num_negativo);
}
