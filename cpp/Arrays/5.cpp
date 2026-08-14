#include <stdio.h>
#define tam 2

main(){
	float salario, valorUnidade[tam], quantidade[tam], codProd[tam], vendatotal, comissao;
	int i;
	for(i=0; i<tam; i++){
		printf ("Digite o codigo do produto: ");
		scanf ("%f", &codProd[i]);
		printf ("Digite o valor da unidade do produto %.0f: ", codProd[i]);
		scanf ("%f", &valorUnidade[i]);
		printf ("Digite a quantidade comprada do produto %.0f: ", codProd[i]);
		scanf ("%f", &quantidade[i]);
		vendatotal = valorUnidade[i] * quantidade[i];
		salario = 400;
		printf ("Relatorio Geral:\n Codigo:%.0f\n Valor Unidade:%.2f\n Quantidade:%.0f\n Valor total:%.2f\n", codProd[i], valorUnidade[i], quantidade[i], vendatotal);
	}
	comissao = salario + (vendatotal * 0.05);
	printf("Valor da comissao: %f", comissao);
}
