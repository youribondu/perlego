import request from "supertest";
import app from "../src/app";
import "regenerator-runtime/runtime";
import BookBuilder from "../src/builders/bookBuilder";
import Book from "../src/models/book";
import BookRepository from "../src/repositories/bookRepository";
import MockDatabase from "./__mocks__/mockDatabase";

describe("Books Service", () => {
  describe("API - GET /books", () => {
    test("Should return status 200", async () => {
      const response = await request(app).get("/books");
      expect(response.status).toBe(200);
    });

    test("Should return list of 12 Books with skip parameter", async () => {
      const response = await request(app).get("/books").query({ skip: 10 });
      expect(response.body.data.results.length).toBe(12);
    });

    test("Should return list of 12 Books with null skip parameter", async () => {
      const response = await request(app).get("/books").query({ skip: null });
      expect(response.body.data.results.length).toBe(12);
    });

    test("Should return list of 12 Books without skip parameter", async () => {
      const response = await request(app).get("/books");
      expect(response.body.data.results.length).toBe(12);
    });
  });

  describe("Book Repository", () => {
    test("Test findAll function", async () => {
      const expected = [
        new Book({
          title: "title",
          cover: "cover",
          authors: ["author1", "author2", "author3"],
        }),
      ];
      const mockDB = MockDatabase.getInstance();
      const repository = new BookRepository(mockDB);
      const response = await repository.findAll();

      // Assert
      expect(response).toEqual(expected);
      expect(response.length).toBe(1);
    });

    test("Test countOfBooks function", async () => {
      const expected = 50;
      const mockDB = MockDatabase.getInstance();
      const repository = new BookRepository(mockDB);
      const response = await repository.countOfBooks();

      // Assert
      expect(response).toBe(expected);
    });
  });

  describe("Book Builder", () => {
    test("Build a Book", async () => {
      const expected = new Book({
        title: "Test title",
        cover: "cover",
        authors: ["Author 1", "Author 2"],
      });
      const response = new BookBuilder()
        .setTitle("Test title")
        .setCover("cover")
        .setAuthors(["Author 1", "Author 2"])
        .build();

      // Assert
      expect(response).toEqual(expected);
    });
  });
});
