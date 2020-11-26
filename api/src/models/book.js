/**
 * Book Model
 */
export default class Book {
  constructor(bookBuilder) {
    this.title = bookBuilder.title;
    this.authors = bookBuilder.authors;
    this.cover = bookBuilder.cover;
  }
}
