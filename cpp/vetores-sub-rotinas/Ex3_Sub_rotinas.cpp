/*Crie uma função em linguagem C que receba 1 número inteiro e retorna se este número é impar ou
não.*/

#include <stdio.h>
#include <conio.h>

int impar( int a);

void impar( int a, int *status){
	if(a % 2 != 0){
	
	*status = 1;
	}
	else{
		*status = 0;
	}
}

int main(){
	int ok=0;
	int inpar;
	
	printf("Digite um numero:\n");
	scanf("%d", &inpar);
	
	impar(inpar, &ok);
	
	if(ok == 1){
		printf("Impar\n");
	}
	if(ok == 0){
		printf("Par\n");
	}
	
	
	
}
