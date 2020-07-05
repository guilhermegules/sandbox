#include <stdio.h>
#define tam 3

main(){
	int m[tam][tam],i,j,soma=0;
	
	for(i=0; i<tam; i++){
		for(j=0; j<tam; j++){
			
		}
		printf("Digite um valor: ");
		scanf("%i", &m[i][j]);
	}
	for(j=0; j<2;j++){
		soma = soma + m[j][1];
	}
	printf("%i", soma);
}
