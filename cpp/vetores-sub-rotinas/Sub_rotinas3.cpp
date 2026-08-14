#include <stdio.h>
#include <conio.h>

int maior_de3(int a, int b, int c);
int maior_de3(int a, int b, int c){
	int resp;
	if(a>c && a>b){
		resp=a;
	}
	else if(b>a && b>c){
		resp = b;
	}
	else{
		resp = c;
	}
	return resp;
}

main(){
	int v1, v2, v3;
	
	printf("Digite três valores: \n");
	scanf("%i", &v1);
	scanf("%i", &v2);
	scanf("%i", &v3);
	
	printf("O maior valor de tres: %i",maior_de3(v1,v2,v3));
}
