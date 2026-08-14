#include <stdlib.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
  int i;

  for (i = 0; i < 4; i++) {
    fork();
    sleep(3);
  }

  return 0;
}