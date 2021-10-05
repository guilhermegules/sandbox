#include <stdio.h>
#include <string.h>

struct Book
{
  char title[50];
  char author[50];
  char subject[50];
  int bookId;
};

void printBook(struct Book book)
{
  printf("Book title: %s\n", book.title);
  printf("Book author: %s\n", book.author);
  printf("Book subject: %s\n", book.subject);
  printf("Book bookId: %d\n", book.bookId);
}

void printBookWithPointer(struct Book *book)
{
  printf("Book title: %s\n", book->title);
  printf("Book author: %s\n", book->author);
  printf("Book subject: %s\n", book->subject);
  printf("Book bookId: %d\n", book->bookId);
}

int main()
{
  struct Book Book1;
  struct Book Book2;

  strcpy(Book1.title, "C Programming");
  strcpy(Book1.author, "Guilherme Gules Moreira");
  strcpy(Book1.subject, "C Programming Tutorial");
  Book1.bookId = 666589;

  strcpy(Book2.title, "C coding structures");
  strcpy(Book2.author, "Guilherme Gules Moreira");
  strcpy(Book2.subject, "C Programming tutorial");
  Book2.bookId = 654877;

  printBook(Book1);

  printf("\n");

  printBookWithPointer(&Book2);

  return 0;
}