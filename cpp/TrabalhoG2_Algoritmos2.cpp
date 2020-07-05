#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
/*-------------Protótipos-------------*/
float calculoPeso(float kilo, int quantidade);
void cabecalho(void);
/*------------------------------------*/
void cabecalho(void){
	printf("\t\t\t**LOGISTICS SECURITY**\n");
	printf("\t\t\t----------------------\n\n\n");
	return;
}
float calculoPeso(float kilo, int quantidade) {
	float result;
	result = kilo * quantidade;
	return(result);
}

//pont_arq1 = Arquivo dos cadastros

int main(){
	
	setlocale(LC_ALL, "Portuguese");
	FILE *pont_arq1; // cria variável ponteiro para o arquivo
	char palavra[20]; // variável do tipo string
	int opcao1, opcao2, item;
	char nome[50];
	char vercadast[50];
	int quant=0, SN, x, ler, j, inicio;
	const int TAM = 5;
	float peso = 0;
	float resultado; //Declaração de variavel armazenando função
		
	cabecalho();
	
	printf("1:Iniciar\n0:Sair\n");
	scanf("%i", &inicio);
	if(inicio==0){
		return 0;
	}
	if(inicio == 1){
	system("cls");
	cabecalho();
	printf("Digite seu nome:\n");
	scanf("%s", &nome);
	
	volta:
	system("cls");
	cabecalho();
	printf("Digite seu nome:\n%s\n", nome);
	do{
		printf("\t\tESCOLHA UMA OPÇÃO\n");
		printf("1:Inicia transporte.\n2:Cadastrar.\n0:Sair\n");
		scanf("%i", &opcao1);
		if(opcao1>=3||opcao1<0){
			printf("Opção incorreta! Digite novamente.\n");
		}
	}while(opcao1>=3||opcao1<0);
	if(opcao1==0){
		printf("Programa encerrado!");
	}
	system("cls");
	switch(opcao1){
		case 2:
			cabecalho();
			//abrindo o arquivo com tipo de abertura w
			pont_arq1 = fopen("transporte.txt", "w");
			//testando se o arquivo foi realmente criado
			if(pont_arq1 == NULL){
				printf("Erro na abertura do arquivo!");
			}
			for(x=0; x<TAM; x++){
				printf("Escreva um transporte para cadastro:\n");
				scanf("%s", &palavra);
				//usando fprintf para armazenar a string no arquivo
				fprintf(pont_arq1, "%s\n", palavra);
				do{
					printf("1:Cadastrar novamente.\n0:Voltar.\n");
					scanf("%i", &SN);
					if(SN<0||SN>1){
						printf("Opção incorreta! Digite novamente.");
					}
				}while(SN<0||SN>1);
				if(SN==0){
					goto volta;
					system("cls");
					}
				}
			printf("Dados gravados com sucesso!\n");
			//usando fclose para fechar o arquivo
			fclose(pont_arq1);
			
		case 0:
			return 0;
		case 1:
			cabecalho();
			printf("\t\tMENU\n");
			printf("Escolha uma opcao:\n");
			printf("1:Transporte.\n2:Ver.\n0:Sair.\n");
			scanf("%i", &opcao2);
			system("cls");
			switch(opcao2){
				case 1:
					cabecalho();
					printf("\t\tTRANSPORTE\n");
					do{
						printf("Escolha o item:\n");
						printf("1-Componentes eletrônicos\n2-Painel\n3-Cofre\n");
						scanf("%i", &item);
						if(item>3||item<=0){
							printf("Seleção de itens incorreta! Digite novamente.\n");
						}
					}while(item>3||item<=0);
					if(item==1) { //Definindo peso para os itens
						peso=5;
					} else if (item == 2) {
						peso = 10;
					} else if (item == 3) {
						peso = 700;
					}
					system("cls");
					inicio:
					while(quant<=0){
						cabecalho();
						printf("Digite a quantidade:\n");
						scanf("%i", &quant);
						if(quant<=0){
							printf("Quantidade de produtos inválida! Digite novamente\n");
							}
						}
					resultado = calculoPeso(peso, quant);
					FILE*cadastros;
					char cadast[50];
					cadastros = fopen("Cadastro.txt", "a");
					if(cadastros == NULL){
						printf("ERROR");
						}	
					if(item==1){
						if(quant<4){
							fprintf(cadastros,"%i componentes transportados pelo usuario %s no transporte T2, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("%i componentes transportados pelo usuario %s no transporte T2, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf( "Transporte registrado com sucesso!\n");
							return 0;
							fclose(cadastros);
							}
						else if(quant<8){
							fprintf(cadastros,"%i componentes transportados pelo usuario %s no transporte T3, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("%i componentes transportados pelo usuario %s no transporte T3, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("Transporte registrado com sucesso!\n");
							return 0;
							fclose(cadastros);
							}
						else if(quant<11){
							fprintf(cadastros,"%i componentes transportados pelo usuario %s no transporte T4, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("%i componentes transportados pelo usuario %s no transporte T4, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("Transporte registrado com sucesso!\n");
							return 0;
							fclose(cadastros);
							}
						else if(quant>=11){
							printf("\n\n\t\t**QUANTIDADE SUPERIOR AO SUPORTADO**\n");
							system("pause");
							system("cls");
							goto volta;
							}
					}
					if(item==2){
						if(quant<4){
							fprintf(cadastros,"%i paineis transportados pelo usuario %s no transporte T2, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("%i paineis transportados pelo usuario %s no transporte T2, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("Transporte registrado com sucesso!\n");
							return 0;
							fclose(cadastros);
							}
						else if(quant<8){
							fprintf(cadastros,"%i paineis transportados pelo usuario %s no transporte T3, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("%i paineis transportados pelo usuario %s no transporte T3, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("Transporte registrado com sucesso!\n");
							return 0;
							fclose(cadastros);
							}
						else if(quant<11){
							fprintf(cadastros,"%i paineis transportados pelo usuario %s no transporte T4, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("%i paineis transportados pelo usuario %s no transporte T4, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("Transporte registrado com sucesso!\n");
							return 0;
							fclose(cadastros);
							}
						else if(quant>=11){
							printf("\n\n\t\t**QUANTIDADE SUPERIOR AO SUPORTADO**\n");
							system("pause");
							system("cls");
							goto volta;
							}
					}
					if(item==3){
						if(quant<4){
							fprintf(cadastros,"%i cofres transportados pelo usuario %s no transporte T2, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("%i cofres transportados pelo usuario %s no transporte T2\n com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("Transporte registrado com sucesso!\n");
							return 0;
							fclose(cadastros);
							}
						else if(quant<8){
							fprintf(cadastros,"%i cofres transportados pelo usuario %s no transporte T3, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("%i cofres transportados pelo usuario %s no transporte T3\n com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("Transporte registrado com sucesso!\n");
							return 0;
							fclose(cadastros);
							}
						else if(quant<11){
							fprintf(cadastros,"%i cofres transportados pelo usuario %s no transporte T4, com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("%i cofres transportados pelo usuario %s no transporte T4\n com o peso total de: %.2f kg\n", quant, nome, resultado);
							printf("Transporte registrado com sucesso!\n");	
							return 0;
							fclose(cadastros);
							}
						else if(quant>=11){
							printf("\n\n\t\t**QUANTIDADE SUPERIOR AO SUPORTADO**\n");
							system("pause");
							system("cls");
							goto volta;
							}
	
					}

				case 2:
					int op;
					cabecalho();
					//abrindo o arquivo com tipo de abertura
					pont_arq1 = fopen("transporte.txt", "r");
					//testando se o arquivo foi realmente criado
					if(pont_arq1 == NULL){
						goto volta;
						printf("Erro na abertura do arquivo!");
					}
					while(fscanf(pont_arq1, "%s", vercadast)!=EOF){
						printf("%s\n", vercadast);
					}
					//usando fclose para fechar o arquivo
					//fclose(pont_arq1);
					do{
						printf("\nDigite 0 para voltar.\n");
						scanf("%i", &op);
						if(op!=0) {
							printf("Opção inválida, Digite novamente!");
						} else if (op==0) {
							goto volta;	
						}
					} while(op!=0);
				case 0:
					return 0;		
			}	
	}
}
}
