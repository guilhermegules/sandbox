#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

void exemploFork() {
  if(fork() != 0) {
    printf("\n:: Pai \n");
    sleep(25);
    wait(0);
  }
  else {
    printf("\n::: Filho \n");
    sleep(10);
  }
}

int main() {
  printf("\n\nExemplo Fork\n");

  exemploFork();
  
  return 0;
}