#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define BORDER 9
#define NUMBER 1

struct Register {
	int row;
	int column;
	struct Register* next;
};

typedef struct Register Node;

void showArray(int* array, int N, int M) {
	int i, j;
  char* displayChar = "";

	for (i = 0; i < N; i++)	{
		for (j = 0; j < M; j++)	{
      if(array[i * N + j] == NUMBER) {
        displayChar = "#";
      } else if (array[i * N + j] == BORDER) {
        displayChar = "-";
      } else {
        displayChar = ".";
      }
			printf(" %c", *displayChar);
		}
		printf("\n");
	}
}

void addNode(int row, int column, Node* nextNode) {
	Node* newNode;
	newNode = (Node*)malloc(sizeof(Node));
	newNode->row = row;
	newNode->column = column;

	newNode->next = nextNode->next;
	nextNode->next = newNode;
}

void showList(Node* list) {
	if (list != NULL) {
		printf(" ::: L: %3d :: C: %3d\n", list->row, list->column);
		showList(list->next);
	}
}

bool hasNode(int row, int column, Node* list) {
	bool haveReturn = false;

	if (list == NULL)	{
		haveReturn = false;
	}	else if (list->row == row && list->column == column) {
		haveReturn = true;
	}	else {
    haveReturn = hasNode(row, column, list->next);
  }

	return haveReturn;

}

int checkNodes(int row, int column, int* array, int N, int M, Node* list) {
	int nodeQuantity = 0;

	// The position is on the list
	if (hasNode(row, column, list) || array[row * N + column] != NUMBER) {
		return nodeQuantity;
	}

	// Add a new point o the list
	addNode(row, column, list);
	nodeQuantity++;

	// Will test all blocks arround of selected item
  // above 	
	if (row > 0) {
		nodeQuantity += checkNodes(row - 1, column, array, N, M, list);
    array[(row - 2) * N + column - 1] = BORDER;
	}

  // bellow
	if (row < N - 1) {
		nodeQuantity += checkNodes(row + 1, column, array, N, M, list);
    array[(row + 2) * N + column + 1] = BORDER;
	}

  // left
	if (column > 0) {
		nodeQuantity += checkNodes(row, column - 1, array, N, M, list);
    array[(row - 1) * N + column - 1] = BORDER;
	}

  // right
	if (column < M - 1) {
		nodeQuantity += checkNodes(row, column + 1, array, N, M, list);
    array[(row - 1) * N + column + 1] = BORDER;
	}

  // top left diagonal
	if (row > 0 && column > 0) {
		nodeQuantity += checkNodes(row - 1, column - 1, array, N, M, list);
    array[(row - 2) * N + column - 2] = BORDER;
	}

  // top right diagonal
	if (row > 0 && column < M - 1) {
		nodeQuantity += checkNodes(row - 1, column + 1, array, N, M, list);
    array[(row - 2) * N + column + 2] = BORDER;
	}

  // bottom left diagonal
	if (row < N - 1 && column > 0) {
		nodeQuantity += checkNodes(row + 1, column - 1, array, N, M, list);
    array[(row + 2) * N + column - 2] = BORDER;
	}

  // bottom right diagonal
	if (row < N - 1 && column < M - 1) {
		nodeQuantity += checkNodes(row + 1, column + 1, array, N, M, list);
    array[(row + 2) * N + column + 2] = BORDER;
	}

	return nodeQuantity;
}


int main() {
	int matrix[] = {
		1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
		0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0,
		1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0,
		1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
		0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
		0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
		1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0
	};

  // N: rows quantity and M columns quantity
	int N = 20, M = 20; 

	Node* listHeader = NULL;
	listHeader = (Node*)malloc(sizeof(Node));
	listHeader->row = -1;
	listHeader->column = -1;
	listHeader->next = NULL;


	showArray(matrix, N, M);
	
	int L, C, nodeQuantity = 0, objectQuantity = 0;
	for (L = 0; L < N; L++)	{
		for (C = 0; C < M; C++)	{
			nodeQuantity = checkNodes(L, C, matrix, N, M, listHeader);

			if (nodeQuantity > 0) {
        objectQuantity++;
      }
		}
	}

  for(int i = 0; i < N; i++) {
    for(int j = 0; j < M; j++) {
      printf("[%d]", matrix[i * N + j]);
    }
    printf("\n");
  }

	// showArray(matrix, N, M);

	printf("\n::: %d objetos identificados!\n", objectQuantity);
}
