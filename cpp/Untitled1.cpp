#include <stdio.h>
#include <conio.h>
#include <math.h>

void invalido(float valor, int *status){
	if(valor>120)
	{
		*status=0;
		}
	else if(valor<=120)
		*status=1;
		}

int main(){
    float valor_produto[4];
    char n[10], p[10];         
    char loja[2][10];
    char produto[32][10];
    int i, j; //INDICES DAS MATRIZES
    int l=1, q=1; //CONTA AS LOJAS
    int t=2, r=2; //NUMERO DE PRODUTOS
    int y=0, f=0; //INICIA AS LOJAS
    int x=0, m=0; //INICIA OS PRODUTOS
    int e=1, v=1; //CONTA OS PRODUTOS
    int s=1, h=1; //CONTA VALORES
    int ok;
    
    //Leitura das 8 loja
         printf("LEITURA\n\n");
        while(q<=2){
        printf("LOJA %d!\n", q);
        for(i=f; i<q; i++){
    	printf("Digite o nome da loja\n");
        scanf("%s", &n);
        for(j=0; j<10; j++){
        	loja[i][j]=n[j];
            }
            printf("\n");
        }
        q++;
        f++;
        
        //Leitura dos produtos
        printf("PRODUTOS!\n");
        for(i=m; i<r; i++){
        printf("Digite o produto %d\n", v);
        v++;
        scanf("%s", &p);
        for(j=0; j<10; j++){
            produto[i][j]=p[j];
            }
            printf("\n");
        }
        
        //Leitura dos valores
        printf("Valores\n");
        for(i=m; i<r; i++){
        printf("Digite o valor do produto %d:\n", h);
        scanf("%f", &valor_produto[i]);
        	printf("\n");
        	h++;
        }
        r=r+2;
        m=m+2;
        }

        //Apresentar os valores
        printf("ORDEM\n\n");
        while(l<2){
        printf("LOJA %d!\n", l);
        for(i=y; i<l; i++){
        	printf("Nome da loja: ");
        	for(j=0; j<10; j++){    
            printf("%c", loja[i][j]);
            }
            printf("\n");
        }
        l++;
        y++;
        printf("PRODUTOS!\n");
        for(i=x; i<t; i++){
        	printf("Produto %d: ", e);
        	e++;
        for(j=0; j<10; j++){
            printf("%c", produto[i][j]);
            }
            printf("\n");
        }
        printf("VALORES!\n");
        for(i=x; i<t; i++){
        	invalido(valor_produto[i],&ok);
        	if(ok == 1)
        	{
        	printf("Valor do produto %d: %.2f", s,  valor_produto[i]);
        	}else if(ok==0){
        	printf("VALOR INVALIDO");}
        	printf("\n");
        	s++;
        }
        t=t+2;
        x=x+2;
        }
}
