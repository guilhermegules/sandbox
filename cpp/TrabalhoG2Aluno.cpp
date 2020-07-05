#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <conio.h>
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
	struct aluno aluno; //variável struct de aluno 
	char cadastro[10];
	printf("\t\t\tCadastro de Aluno\n\n\n");
	
	int i, j; // váriaveis de indice
	int opcao = 0;
	
	while(opcao > 4 || opcao < 1) {
		menu:
		printf("\nOque você deseja? \n1-Inserir \n2-Lista \n3-Pesquisar \n4-Excluir \n");
		scanf("%i", &opcao);
		system("cls");
		if(opcao > 4 || opcao < 1) {
			printf("Opção inválida digite novamente!\n");
		}
	}
	
	switch(opcao) {
		
		case 1:
			printf("\t\t\tInserir\n\n");
		for(i = 0; i<2; i++) {
			printf("\nDigite o número acadêmico do aluno: ");
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
			printf("Inserção feita com sucesso!!\n");
			system("cls");
			system("pause");
			goto menu;
		break;
		
		case 2:
			printf("\t\t\tListar\n\n");
			for(i = 0; i<2; i++) {
					printf("Número do acadêmico aluno: %d\n", cadastro[i]);
					printf("Nome do aluno: %s\n" , cadastro[i]);
					printf("Primeira nota: %.2f\n",	cadastro[i]);
					printf("Segunda nota: %.2f\n", cadastro[i]);
					printf("Média do aluno: %.2f\n", cadastro[i]);
			}
			printf("\nVocê deseja voltar \n1-Sim \n2-Encerrar programa");
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
			printf("Oque você deseja pesquisar? \n1-Número do aluno \n2-Nome do aluno \n3-Média do aluno");
		break;
		
		case 4:
			printf("Excluir");
			
		break;	
		
	}
	/*Com estas informações solicita-se que desenvolva um programa com um menu mínimo que tenha as seguintes informações:
 
	a. INSERIR – Inserir dados de um único aluno na primeira posição livre encontrada em um vetor de struct. Sua função deverá receber como parâmetro no mínimo o vetor onde serão inseridos os dados e
	uma variável que indique o tamanho do vetor em questão. Como retorno da função espera-se 0 para uma inserção com sucesso, e 1 quando não for possível realizar inserção.
	
	b. LISTAR – Deverá listar os dados de todos alunos cadastrados. Para isto deve ser construída um procediento que exiba todas as posições ocupadas de um determinado vetor de struct. Este procedimento
	deverá receber como parâmetro pelo menos o vetor e o tamanho deste vetor e exibir todos dados armazenados no vetor.
	
	c. PESQUISAR – A pesquisa deve ser realizada através de uma função específica que receba como parâmetro o vetor de dados, o tamanho deste vetor, e o nome a ser consultado neste vetor. O retorno será
	a posição onde este nome for encontrado, ou no caso de não encontrar a informação no vetor, deverá retornar -1.
	
	d. EXCLUIR – Seu programa deverá permitir que o usuário solicite a exclusão de um cadastro através do nome. Para isto deve haver um procedimento responsável por excluir um determinado registro do struct. Seu procedimento para exclusão deverá receber a struct específica a ser excluída. Para isso, antes de passar o struct como parâmetro na chamada do procedimento Excluir, você deve utilizar a função
	Pesquisa (letra c), e realizar o processo de exclusão dos dados. NÃO DEVERÁ SER PASSADO O VETOR INTEIRO COMO PARÂMETRO!*/

}
