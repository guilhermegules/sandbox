/*Controle de viagens aéreas: o sistema deve permitir ao usuário
cadastrar e consultar voos, a partir de um menu de opções.
A opção de cadastro deve ler um conjunto de dados composto por 
número do voo, origem e destino, permitindo que o usuário encerre
esse processo digitando 0 (zero) para o número do voo. 
A opção consultar deverá ler o número do voo e apresentar origem 
e destino (ou uma mensagem informando que o voo não foi encontrado, quando for 
o caso), permitindo que o usuário faça quantas consultas quiser. 
Por fim, a opção listar voos deverá apresentar a lista de todos os voos cadastrados.*/

#include <stdio.h>
#include <conio.h>
#include <stdlib.h>

main() {
	
	FILE *aeroporto;
	char voo[30];
	
	aeroporto = fopen("voo_cadastrado.txt", "w");
	
	if(aeroporto == NULL){
		
		printf("ERRO! voo não cadastrado\n");	
	}
	printf("Digite o nome do voo: ");
	printf("\n");
	scanf("%s", voo);
	 
	fprintf(aeroporto, "%s", voo);
	
	aeroporto = fopen("voo_cadastrado.txt", "r");
	
	fprintf(aeroporto, "%s");
	
	fclose(aeroporto);
	printf("Dados gravados com sucesso!");
	getch();
}
