import express from "express";
import cors from "cors";
import bookRouter from "./routers/book";

// Start Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(bookRouter);

module.exports = app;
