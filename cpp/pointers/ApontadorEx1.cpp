#include <stdio.h>

int main(){
  int *m, cont=100, q;
  m = &cont; //m recebe o endereço de cont
  q = *m; //q recebe o valor apontado por m
  printf("m = %d\n", m); //imprime o endereço de cont
  printf("*m = %d\n", *m); //imprime o conteúdo da variável apontada pelo ponteiro
  printf("&m = %d\n", &m); //imprime o endereço de m
  printf("cont = %d\n", cont); //imprime o conteúdo de cont
  printf("&cont = %d\n", &cont); //imprime o endereço da variável cont
  printf("q = %d\n", q); //Imprime o conteúdo da variável q
}
