#include <stdio.h>

main(){
	
	/*5) Escreva um programa em C que receba o valor do sal�rio m�nimo, uma lista contendo a quantidade de
	quilowatts gasta por consumidor e o tipo de consumidor (1 � residencial, 2 � comercial, 3 � industrial) e
	que calcule e mostre:
	h. O valor de cada quilowatt, sabendo que o quilowatt custa 1/20 do sal�rio m�nimo.
	i. O valor a ser pago por cada consumidor (conta final mais o acr�scimo). O acr�scimo para consumidores
	do tipo 1 � de 5%, do tipo 2 � de 10% e do tipo 3 � de 15% sobre o valor gasto.
	j. O faturamento geral da empresa.
	k. A quantidade de consumidores que pagam entre R$ 500,00 e R$ 1000,00 de conta.
	Termine a entrada de dados com quantidade de quilowatts igual a 0.*/
	
	float sal_minimo=998, quilowats=1, valor_quilowats, fator_geral, consumidor,val_consumidor, conta_final, valor_pago;
	int tipo, i;
	
		printf("Qual a quantidade de quilowats gasta? \n");
		scanf("%f", &quilowats);
		
	while(quilowats!=0){
		valor_quilowats = sal_minimo / 200;
		
		valor_pago = quilowats * valor_quilowats;
		printf("Digite o tipo de consumidor \n1 - Residencial \n2 - Comercial \n3 - Industrial\n");
		scanf("%i", &tipo);
		switch(tipo){
			case 1:
				conta_final = valor_pago * 1.05;
			break;
			case 2:
				conta_final = valor_pago * 1.10;
			break;
			case 3:
				conta_final = valor_pago * 1.15;
			break;
		}
		if((conta_final > 500)&&(conta_final < 1000)){
			val_consumidor = val_consumidor + 1;
		}
		printf("Valor total da conta: %.2f\n", conta_final);
		printf("Qual a quantidade de quilowats gasta? \n");
		scanf("%f", &quilowats);
	}
	
	printf("Numero de usuarios com a conta entre 500 e 1000: %.0f\n", val_consumidor);
}
