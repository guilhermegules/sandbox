export interface BookInterface {
  image: string;
  title: string;
  description: string;
  price: number;
  upvotes: number;
  genre?: string;
  category?: string;
}

export class BookModel implements BookInterface {
  constructor(
    public image: string,
    public title: string,
    public description: string,
    public price: number,
    public upvotes: number = 0,
    public genre: string = 'not defined',
    public category: string = 'not defined'
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
          book.upvotes,
          book.genre,
          book.category
        );
      }
    }
    return null;
  }

  public static query() {
    const books: BookModel[] = JSON.parse(
      localStorage.getItem('books') || '[]'
    );
    const bookModels: BookModel[] = [];
    for (const book of books) {
      bookModels.push(
        new BookModel(
          book.image,
          book.title,
          book.description,
          book.price,
          book.upvotes,
          book.genre,
          book.category
        )
      );
    }
    return bookModels;
  }

  getData(): object {
    const result = {};
    Object.keys(this).map(key => result[key] = this[key]);
    return result;
  }

  public save() {
    const books: BookModel[] = JSON.parse(
      localStorage.getItem('books') || '[]'
    );

    books.forEach((item, index) => {
      if (item.title === this.title) {
        books.splice(index, 1);
      }
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
