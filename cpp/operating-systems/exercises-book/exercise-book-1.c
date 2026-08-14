#include <stdlib.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int value = 5;
int main() {
  pid_t pid;

  pid = fork();

  if (pid == 0) { /* processo-filho */
    value += 15;
    printf("SON: %d\n", value);
    return 0;
  } else if (pid > 0) { /* processo-pai */
    printf("PARENT: value = %d", value); /* LINHA A */
    wait(NULL);
    return 0;
  }
}