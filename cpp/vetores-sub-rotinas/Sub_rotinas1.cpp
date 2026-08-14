// Crie uma função que receba três valores, 'a', 'b' e 'c', que são os coeficientes de uma equação do
// segundo grau e retorne o valor do delta, que é dado por 'b2 - 4ac'

#include <stdio.h>

int delta(int a, int b, int c);

// Função
int delta(int a, int b, int c){
	int d = 0;
	d = (b * b) - (4 * a * c);
	return d;
}

// Programa principal
int main(){
	
	int v1, v2, v3;
	printf("Digite um valor:\n");
	scanf("%i", &v1);
	printf("Digite um valor:\n");
	scanf("%i", &v2);
	printf("Digite um valor:\n");
	scanf("%i", &v3);
	
	printf("Valor do delta %i", delta(v1, v2, v3)); // Passagem dos valores (v1=a, v2=b, v3=c)
}
