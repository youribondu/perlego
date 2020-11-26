import React from "react";
import ReactDom from "react-dom";
import Book from "../index";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { create } from "react-test-renderer";

describe("Book Component", () => {
  afterEach(cleanup);

  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Book />, div);
  });

  it("Renders book correctly", () => {
    const title = "title";
    const authors = ["author1", "author2"];
    const cover = "cover";
    const { getByTestId } = render(
      <Book title={title} authors={authors} cover={cover} />
    );
    expect(getByTestId("book-title")).toHaveTextContent(title);
    expect(getByTestId("book-author")).toHaveTextContent(authors[0]);
  });

  it("Matches snapshot empty", () => {
    const book = create(<Book />).toJSON();
    expect(book).toMatchSnapshot();
  });

  it("Matches snapshot with props", () => {
    const title = "title";
    const authors = ["author1", "author2"];
    const cover = "cover";
    const book = create(
      <Book title={title} authors={authors} cover={cover} />
    ).toJSON();
    expect(book).toMatchSnapshot();
  });
});
