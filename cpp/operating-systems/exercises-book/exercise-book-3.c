#include <stdlib.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int value = 5;
int main() {
  pid_t pid;

  /* cria um processo-filho */
  pid = fork();

  if (pid < 0) { /* um erro ocorreu */
    fprintf(stderr, "Fork Failed");

    return 1;
  }  else if (pid == 0) { /* processo-filho */
    execlp("/bin/ls", "ls", NULL);

    printf("LINE J");
  } else { /* processo-pai */
    /* o pai esperará o filho terminar */
    wait(NULL);
    printf("Child Complete");
  }

  return 0;
}