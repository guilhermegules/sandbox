#include <stdio.h>
#include <conio.h>
#include <string.h> 

main(){
	/*
	Algoritmo que permita a entrada de diversos nomes de funcionários e valores de
	salário, ao final o seu programa deve exibir:
	1. O número de funcionários da empresa;
	2. O total gasto com a folha de pagamento;
	3. O salário médio dos funcionários;
	4. O nome da pessoa que recebe o maior salário.
	
	Quando 0 for digitado o programa deve encerrar
	*/
	int i, num_func;
	float salario,maior_salario, soma_salario, media_sal;
	char nome=1;
	
	for(i=0; nome != 0 ; i++){
		printf("Digite o nome do funcionario: \n");
		scanf("%c", &nome);
		if(nome = 0){
			printf("Programa encerrado");
		}
		printf("Digite o salario do funcionario: \n");
		scanf("%f", &salario);
		if(salario > maior_salario){
			maior_salario = salario;
		}
		soma_salario = salario + soma_salario;
		media_sal = soma_salario / num_func;
		num_func = num_func + 1;
	}
		printf("numero de funcionarios cadastrados %i\n",num_func);
}
