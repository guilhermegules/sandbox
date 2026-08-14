#include <stdio.h>

int main() {
  int y=35, z=10, x=1, *p;
  p=&x;
  printf("x = %d\n",x); //imprime o conteúdo de x
  printf("p = %u\n",p); //imprime o endereço contido em p
  printf("*p+1 = %d\n",*p+1); //conteúdo + 1
  printf("*p = %d\n\n",*p); //imprime o conteúdo apontado
  (*p)++; // incrementa o conteúdo apontado por p
  printf("Após fazer (*p)++ \n *p = %d\n",*p); //imprime o conteúdo após alterado
  printf(" p = %u\n\n",p); //imprime o endereço
}
