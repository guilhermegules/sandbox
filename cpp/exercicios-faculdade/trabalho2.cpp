/*2) Escreva um programa que receba o estoque atual de trás produtos, armazenados em quatro armazéns, e
coloque esses dados em uma matriz 5x3. Considerando que a última linha dessa matriz contém o custo de cada
produto, o programa deverá calcular e mostrar:
a. A quantidade de itens armazenados em cada armaz�m;
b. Qual armazém possui maior estoque do produto 2;
c. Qual armazém possui menor estoque;
d. Qual o custo total de cada produto (total de cada produto x valor do produto);
e. Qual o custo total de cada armazém (montante que cada armazém tem em produtos).*/
#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

main(){
	setlocale(LC_ALL, "Portuguese");
	int ordem [5][3];
	int i, j, maior, a=0;

	for(j=0; j<3; j++)
	{
	   for(i=0; i<4; i++){
        	printf("Digite o estoque do produto %i do armazem %i: ", j, i);
     		scanf("%i",&ordem[j][i]);
     		printf("%i", ordem[j][i]);
	   }
	}
	
	
		for(j=0; j<3; j++){
	for(i=0; i<4; i++){
		printf("estoque do produto %i - � %i do armazem %i \n", j, ordem[j][i], i);	
		

	}
	}
	maior = ordem[0][1];
	for(i=0; i<4; i++){
		
		if(maior < ordem[i][1]){
			maior = ordem[i][1];
			a=i;
			printf("\n maior estoque %i",maior);
			printf("\n nro armazem maior %i",i);
		}
	}
	printf("Armazem %i tem o maior estoque produto 2\n", a+1);
}

