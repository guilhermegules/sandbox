// Crie uma função em linguagem C que receba 2 números e retorne o maior valor.

#include <stdio.h>

int maior(int a, int b);

//Função
int maior(int a, int b){
	int res = 0;
	if(a > b) {
		res = a;
	}	else {
		res=b;
	}

	return res;
}

//Programa principal
int main(){
	int num1, num2;
	
	printf("Digite um valor:\n");
	scanf("%d", &num1);
	printf("Digite um valor:\n");
	scanf("%d", &num2);
	
	printf("Maior numero: %d", maior(num1, num2));
}

