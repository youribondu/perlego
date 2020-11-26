import express from "express";
import Database from "../db/database";
import BookRepository from "../repositories/bookRepository";
import validator from "validator";

const router = new express.Router();

/**
 * Route to get Books
 */
router.get("/books", async (req, res) => {
  try {
    // Init database connection
    const db = Database.getInstance();
    await db.connect();

    // Get the skip parameter
    const skip =
      req.query.skip && validator.isInt(req.query.skip)
        ? parseInt(req.query.skip)
        : 0;

    // Init the repository
    const repository = new BookRepository(db.getConnection());

    // Execute Query
    const books = await repository.findAll(skip);
    const count = await repository.countOfBooks();

    await db.disconnect();

    // Send data
    res.status(200).send({
      data: {
        results: books,
        totalResults: books.length,
        hasMore: count != skip + books.length,
      },
      message: "Success",
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .send({ data: {}, message: `Error: get books`, success: false });
  }
});

module.exports = router;
