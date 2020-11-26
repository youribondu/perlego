import React from "react";
import "./index.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Book = ({ title = "", authors = [], cover = "" }) => {
  return (
    <div className="p-book">
      <LazyLoadImage alt={title} effect="blur" src={cover} />
      <div className="p-book__info">
        <h3 data-testid="book-title">{title}</h3>
        <p data-testid="book-author">{authors[0]}</p>
      </div>
    </div>
  );
};

export default Book;
