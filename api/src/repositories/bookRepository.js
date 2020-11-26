import BookBuilder from "../builders/bookBuilder";
import { QUERY_GET_BOOKS, QUERY_GET_BOOKS_COUNT } from "../db/queries";

/**
 * Book Repository to execute query
 */
export default class BookRepository {
  constructor(db) {
    this.db = db;
  }

  /**
   * Method to get the 12 books from the skip parameter
   * @param {*} skip
   */
  async findAll(skip = 0) {
    try {
      const [results, fields] = await this.db.query(QUERY_GET_BOOKS(skip));

      return results.map((book) =>
        new BookBuilder()
          .setTitle(book.title)
          .setCover(book.cover)
          .setAuthors(
            [book.author1, book.author2, book.author3].filter(Boolean)
          )
          .build()
      );
    } catch (error) {
      throw new Error("error find books");
    }
  }

  /**
   * Method to get the count of books
   */
  async countOfBooks() {
    try {
      const [results, fields] = await this.db.query(QUERY_GET_BOOKS_COUNT);
      return results[0].total;
    } catch (error) {
      throw new Error("error find books");
    }
  }
}
