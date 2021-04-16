/*Controle de viagens a�reas: o sistema deve permitir ao usu�rio
cadastrar e consultar voos, a partir de um menu de op��es.
A op��o de cadastro deve ler um conjunto de dados composto por 
n�mero do voo, origem e destino, permitindo que o usu�rio encerre
esse processo digitando 0 (zero) para o n�mero do voo. 
A op��o consultar dever� ler o n�mero do voo e apresentar origem 
e destino (ou uma mensagem informando que o voo n�o foi encontrado, quando for 
o caso), permitindo que o usu�rio fa�a quantas consultas quiser. 
Por fim, a op��o listar voos dever� apresentar a lista de todos os voos cadastrados.*/

#include <stdio.h>
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
}
