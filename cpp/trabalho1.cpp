/*1) Escreva um programa que preencha:
a. Um vetor de 8 posições, contendo nomes de lojas;
b. Outro vetor com quatro posições contendo nomes de produtos;
c. Uma matriz com os preços de todos os produtos em cada loja.
O programa deverá mostrar todas as relações (nome do produto – nome da loja) em que o preço não
ultrapasse R$ 120,00.*/

#include <stdio.h>
#include <conio.h>
#include <string.h>
#define tam 10
void teste(float valor, int *status);

void teste(float valor, int *status){
	if(valor>120){
		*status == 1;
	}else if(valor<=120){
		*status == 0;
	}
}

main(){
	
	char n[10];   
	float valorproduto[2] ;     
	char loja[4][10];
	char produto[2][10];
	int i, j, k;

	for(i=0; i<4; i++)   // as 8 lojas
	{
	    printf("Digite o nome da loja:\n");
	    gets(loja[i]);
		for(j=0; j<10; j++){   // cada i tem um nome de ate 30 posicoes      
     	}
     }
     
    for(i=0; i<4; i++)   // as 8 lojas
	{
		for(j=0; j<10; j++){   // cada i tem um nome de ate 30 posicoes      
	      printf("%c", loja[i][j]);
     	}
     	printf("\n");
    }
    
    for(i=0;i<2;i++){
    	printf("Digite o nome do produto:\n");
    	gets(produto[i]);
    		for(j=0;j<10;j++){
    		printf("%c", produto[i][j]);
		}
	}
	for(i=0; i<2; i++){
		printf("Digite o valor do produto:\n");
		scanf("%f", &)
	}
}
