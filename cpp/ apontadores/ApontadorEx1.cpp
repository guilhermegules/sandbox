#include <stdio.h>
#include <conio.h>

int main(){
  int *m, cont=100, q;
  m = &cont; //m recebe o endere�o de cont
  q = *m; //q recebe o valor apontado por m
  printf("m = %d\n", m); //imprime o endere�o de cont
  printf("*m = %d\n", *m); //imprime o conte�do da vari�vel apontada pelo ponteiro
  printf("&m = %d\n", &m); //imprime o endere�o de m
  printf("cont = %d\n", cont); //imprime o conte�do de cont
  printf("&cont = %d\n", &cont); //imprime o endere�o da vari�vel cont
  printf("q = %d\n", q); //Imprime o conte�do da vari�vel q
}
