#include <stdio.h>

int main(){
	int i;
	int vet[6];
	int menor=vet[0];
	int pos, troca;
	
	printf("Digite um valor:\n");

	for(i=0; i<6; i++) {
		scanf("%d", &vet[i]);
	
    for(i=1; i<6; i++) {
      if(menor < vet[i]) {
        menor = vet[i];
        pos = i;
      }

      troca = vet[0];
      vet[0] = vet[pos];
      vet[pos] = troca;
    }
  }

	printf("\n");
  
	for(i=0;i<6;i++){
		printf("%d\n", vet[i]);
	}
}
