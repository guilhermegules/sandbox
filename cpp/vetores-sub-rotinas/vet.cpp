#include <stdio.h>

int main(){
	
	int i;
	int vet[5];
	
	printf("Digite um valor:\n");
	for(i=0;i<5;i++){
		scanf("%d", &vet[i]);
	}
	for(i=0;i<5;i++){
		printf("%d\n", vet[i]);
	}
		
}
