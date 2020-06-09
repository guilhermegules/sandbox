export interface BookInterface {
  image: string;
  title: string;
  description: string;
  price: number;
  upvotes: number;
}

export class BookModel implements BookInterface {
  constructor(
    public image: string,
    public title: string,
    public description: string,
    public price: number,
    public upvotes: number = 0
  ) {}

  public static find(title: string) {
    const books: BookModel[] = JSON.parse(
      localStorage.getItem('books') || '[]'
    );
    for (const book of books) {
      if (book.title === title) {
        return new BookModel(
          book.image,
          book.title,
          book.description,
          book.price,
          book.upvotes
        );
      }
      return null;
    }
  }

  public save() {
    const books: BookModel[] = JSON.parse(
      localStorage.getItem('books') || '[]'
    );

    books.forEach((item, index) => {
      if (item.title === this.title) { books.splice(index, 1); }
    });
    books.push(this);
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }

  public destroy() {
    const books: BookModel[] = JSON.parse(
      localStorage.getItem('books') || '[]'
    );

    books.forEach((item, index) => {
      if (item.title === this.title) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
    return null;
  }
}
