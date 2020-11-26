import "regenerator-runtime/runtime";
import { QUERY_GET_BOOKS_COUNT } from "../../src/db/queries";

let instance = null;

/**
 * Mock Database Singleton
 */
class MockDatabase {
  constructor() {}

  async connect() {}

  async disconnect() {}

  getConnection() {
    return this;
  }

  query(query) {
    if (query == QUERY_GET_BOOKS_COUNT) {
      return [[{ total: 50 }], null];
    } else {
      return [
        [
          {
            title: "title",
            cover: "cover",
            author1: "author1",
            author2: "author2",
            author3: "author3",
          },
        ],
        null,
      ];
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new MockDatabase();
    }

    return instance;
  }
}

module.exports = MockDatabase;
