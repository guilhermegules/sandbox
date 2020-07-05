#include <stdio.h>
#include <conio.h>
#define tam 30

int main()
{
  int vet[tam], vet2[tam], pares, impares, i;
  
  for(i=0;i<tam;i++){
    vet[i]=i;
  }
  for(i=0;i<tam;i++){
    printf("Vetor1: %i ", vet[i]);
  }
  for(i=0;i<tam;i++){
  	vet2[i] = i;
  }
  	for(i=0;i<tam;i++){
	  if(i/2!=0){
	  	i * 3;
	  	printf("Impares: %i\n", vet2[i]);
	  	
	  }else{
	  	i * 2;
	  	printf("Pares: %i\n", vet2[i]);

	  }
	}
}
