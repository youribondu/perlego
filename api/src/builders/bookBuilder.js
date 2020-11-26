import Book from "../models/book";

/**
 * Book Builder to construct Book object
 */
class BookBuilder {
  constructor() {}

  setTitle(title) {
    this.title = title;
    return this;
  }

  setCover(cover) {
    this.cover = cover;
    return this;
  }

  setAuthors(authors) {
    this.authors = authors;
    return this;
  }

  build() {
    return new Book(this);
  }
}

export default BookBuilder;
