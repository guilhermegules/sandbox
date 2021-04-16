#include <stdio.h>

main(){
	float area, altura, base;
	int condicao;
	
	while(condicao = 1){
		
		printf("Voce deseja iniciar? (1-Sim) (0-Nao)");
		scanf("%i", &condicao);
		
		do{
		printf("Digite o valor da base do triangulo: \n");
		scanf("%f", &base);
		}
		while(base<=0);
		
		do{
		printf("Digite a altura do triangulo: \n");
		scanf("%f", &altura);
		}
		while(altura<=0);
		
		area=base*altura/2;
		
		printf("Area total do triangulo %f\n",area);
		
		fflush(stdin);
		
		printf("Voce deseja continuar? (1-Sim) (0-Nao)");
		scanf("%i", &condicao);
		if(condicao = 0){
			printf("Programa finalizado");
		}
		
	}
	
}
