#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#define READ_FILE "r"
#define WRITE_FILE "w"

void populate_matrix(int rows, int columns, int matrix[rows][columns]) {
  for(int i = 0; i < rows; i++) {
    for(int j = 0; j < columns; j++) {
      matrix[i][j] = rand() % 255;
    }
  }
}

void print_matrix(int rows, int columns, int matrix[rows][columns]) {
  for(int i = 0; i < rows; i++) {
    for(int j = 0; j < columns; j++) {
      printf("%3d; ", matrix[i][j]);
    }
    printf("\n");
  }
}

void save_matrix_file(int rows, int columns, int matrix[rows][columns], char* filename) {
  FILE *file_p = fopen(filename, WRITE_FILE);

  // Validate if file's open
  if(file_p == NULL) {
    printf("Error opening file\n");
    exit(1);
  }

  for(int i = 0; i < rows; i++) {
    for(int j = 0; j < columns; j++) {
      fprintf(file_p, "%3d; ", matrix[i][j]);
    }
    fprintf(file_p, "\n");
  }

  fclose(file_p);
}

void get_matrix_from_file(int rows, int columns, char* filename, int matrix[rows][columns]) {
  FILE *file_p = fopen(filename, READ_FILE);

  // Validate if file's open
  if(file_p == NULL) {
    printf("Error opening file\n");
    exit(1);
  }

  for(int i = 0; i < rows; i++) {
    for(int j = 0; j < columns; j++) {
      fscanf(file_p, "%d;", &matrix[i][j]);
    }
  }

  fclose(file_p);
}

int main() {
  int columns, rows, option;

  printf("Type the number of columns: ");
  scanf("%d", &columns);

  printf("\nType the number of rows: ");
  scanf("%d", &rows);

  int numbers[columns][rows];

  do {
  printf("What do you want to do?\n");
  printf("\t(1) - Save matrix on file \n \t(2) - Print matrix with random values \n \t(3) - Get value from a existent file \n \t(0) - Finish the program ");
  scanf("%d", &option);

  switch (option) {
    case 0:
      printf("Finishing...");
      break;
    case 1:
      populate_matrix(rows, columns, numbers);
      printf("%d\n%d\n", rows, columns);
      print_matrix(rows, columns, numbers);
      save_matrix_file(rows, columns, numbers, "rle.txt");
      break;
    case 2:
      populate_matrix(rows, columns, numbers);
      print_matrix(rows, columns, numbers);
      break;
    case 3:
      get_matrix_from_file(rows, columns, "rle.txt", numbers);
      print_matrix(rows, columns, numbers);
      break;
    default:
      printf("Invalid option!");
      break;
  }
  } while (option != 0);
  

  return 0;
}