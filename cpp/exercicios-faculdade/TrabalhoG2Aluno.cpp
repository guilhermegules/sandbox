#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>
#define tam 5;
main() {
	setlocale(LC_ALL, "portuguese");
	/*Criando o struct*/
	struct aluno{
	int numero_academico;
	char nome[40];
	float nota1;
	float nota2;
	float media;
	};
	struct aluno aluno; //vari�vel struct de aluno 
	char cadastro[10];
	printf("\t\t\tCadastro de Aluno\n\n\n");
	
	int i, j; // v�riaveis de indice
	int opcao = 0;
	
	while(opcao > 4 || opcao < 1) {
		menu:
		printf("\nOque voc� deseja? \n1-Inserir \n2-Lista \n3-Pesquisar \n4-Excluir \n");
		scanf("%i", &opcao);
		system("cls");
		if(opcao > 4 || opcao < 1) {
			printf("Op��o inv�lida digite novamente!\n");
		}
	}
	
	switch(opcao) {
		
		case 1:
			printf("\t\t\tInserir\n\n");
		for(i = 0; i<2; i++) {
			printf("\nDigite o n�mero acad�mico do aluno: ");
			scanf("%d", &aluno.numero_academico);
			cadastro[i] = aluno.numero_academico;
			printf("\nDigite o nome do aluno: ");
			fflush(stdin);
			fgets(aluno.nome, 40, stdin);
			cadastro[i] = aluno.nome[40];
			printf("\nDigite a primeira nota: ");
			scanf("%f", &aluno.nota1);
			cadastro[i] = aluno.nota1;
			printf("\nDigite a segunda nota: ");
			scanf("%f", &aluno.nota2);
			cadastro[i] = aluno.nota2;
			aluno.media = (aluno.nota1 + aluno.nota1) / 2;
			cadastro[i] = aluno.media;
		}
			printf("Inser��o feita com sucesso!!\n");
			system("cls");
			system("pause");
			goto menu;
		break;
		
		case 2:
			printf("\t\t\tListar\n\n");
			for(i = 0; i<2; i++) {
					printf("N�mero do acad�mico aluno: %d\n", cadastro[i]);
					printf("Nome do aluno: %s\n" , cadastro[i]);
					printf("Primeira nota: %.2f\n",	cadastro[i]);
					printf("Segunda nota: %.2f\n", cadastro[i]);
					printf("M�dia do aluno: %.2f\n", cadastro[i]);
			}
			printf("\nVoc� deseja voltar \n1-Sim \n2-Encerrar programa");
			scanf("%i", &opcao);
			
			if(opcao == 1) {
				system("cls");
				goto menu;
			} else if (opcao == 2) {
				printf("\nPrograma finalizado!\n");
				system("pause");
			}
		break;
		
		case 3:
			printf("Pesquisar");
			printf("Oque voc� deseja pesquisar? \n1-N�mero do aluno \n2-Nome do aluno \n3-M�dia do aluno");
		break;
		
		case 4:
			printf("Excluir");
			
		break;	
		
	}
	/*Com estas informa��es solicita-se que desenvolva um programa com um menu m�nimo que tenha as seguintes informa��es:
 
	a. INSERIR � Inserir dados de um �nico aluno na primeira posi��o livre encontrada em um vetor de struct. Sua fun��o dever� receber como par�metro no m�nimo o vetor onde ser�o inseridos os dados e
	uma vari�vel que indique o tamanho do vetor em quest�o. Como retorno da fun��o espera-se 0 para uma inser��o com sucesso, e 1 quando n�o for poss�vel realizar inser��o.
	
	b. LISTAR � Dever� listar os dados de todos alunos cadastrados. Para isto deve ser constru�da um procediento que exiba todas as posi��es ocupadas de um determinado vetor de struct. Este procedimento
	dever� receber como par�metro pelo menos o vetor e o tamanho deste vetor e exibir todos dados armazenados no vetor.
	
	c. PESQUISAR � A pesquisa deve ser realizada atrav�s de uma fun��o espec�fica que receba como par�metro o vetor de dados, o tamanho deste vetor, e o nome a ser consultado neste vetor. O retorno ser�
	a posi��o onde este nome for encontrado, ou no caso de n�o encontrar a informa��o no vetor, dever� retornar -1.
	
	d. EXCLUIR � Seu programa dever� permitir que o usu�rio solicite a exclus�o de um cadastro atrav�s do nome. Para isto deve haver um procedimento respons�vel por excluir um determinado registro do struct. Seu procedimento para exclus�o dever� receber a struct espec�fica a ser exclu�da. Para isso, antes de passar o struct como par�metro na chamada do procedimento Excluir, voc� deve utilizar a fun��o
	Pesquisa (letra c), e realizar o processo de exclus�o dos dados. N�O DEVER� SER PASSADO O VETOR INTEIRO COMO PAR�METRO!*/

}
