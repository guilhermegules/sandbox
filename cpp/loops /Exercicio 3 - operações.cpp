#include <stdio.h>

main(){
	int op,i;
	float num1, num2;
	
	for(i=0;op!=5;i++){
		printf("Selecione a opcao desejada: \n1-Soma\n2-Subtracao\n3-Divisao\n4-Multiplicacao\n5-Sair\n");
		scanf("%i", &op);
		switch(op){
			case 1:
				printf("Digite o primeiro numero: \n");
				scanf("%f", &num1);
				printf("Digite o segundo numero: \n");
				scanf("%f", &num2);
				printf("Resultado da soma %2.f\n", num1+num2);
				fflush(stdin);
			break;
			case 2:
				printf("Digite o primeiro numero: \n");
				scanf("%f", &num1);
				printf("Digite o segundo numero: \n");
				scanf("%f", &num2);
				if(num2>num1){
					printf("Resultado da subtracao %2.f\n", num2-num1);
				}
				else{
					printf("Resultado da subtracao %2.f\n", num1-num2);
				}
			break;
			case 3:
				printf("Digite o primeiro numero: \n");
				scanf("%f", &num1);
				printf("Digite o segundo numero: \n");
				scanf("%f", &num2);
				printf("Resultado da divisao %2.f\n", num1/num2);
			break;
			case 4:
				printf("Digite o primeiro numero: \n");
				scanf("%f", &num1);
				printf("Digite o segundo numero: \n");
				scanf("%f", &num2);
				printf("Resultado da multiplicacao %2.f\n" ,num1*num2);
			break;
			default:
				printf("Programa finalizado!");
			break;
		}
	}
}
