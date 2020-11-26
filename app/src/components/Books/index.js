import React, { useEffect, useState, useContext } from "react";
import Book from "../Book";
import * as API from "../../services/api";
import { ApiRoutes } from "../../settings/routes";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import "./index.scss";
import translations from "./i18n";
import LocaleContext from "../../services/context";
import { LOCALE_DEFAULT } from "../../settings/constants";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const { locale } = useContext(LocaleContext) ?? LOCALE_DEFAULT;

  useEffect(() => {
    getBooks(skip);
  }, []);

  /**
   * Method to get books
   */
  const getBooks = (skip) => {
    // Call API to get books
    API.get(ApiRoutes.GET_BOOKS, { skip })
      .then(({ data }) => {
        setBooks([...books, ...data.results]);

        // Increment skip
        setSkip(skip + data.totalResults);

        // Define if there are more books to get
        setHasMore(data.hasMore);
      })
      .catch((error) => {
        // Init states
        setBooks([]);
        setSkip(0);
      });
  };

  const renderSkeletons = () => (
    <ul className="p-books">
      {[...Array(12)].map((value, index) => (
        <li key={index} className="p-books__book">
          <Skeleton height={180} />
          <Skeleton />
          <Skeleton />
        </li>
      ))}
    </ul>
  );

  return (
    <InfiniteScroll
      dataLength={skip}
      next={() => getBooks(skip)}
      hasMore={hasMore}
      loader={renderSkeletons()}
      endMessage={
        <p className="p-books__end">
          <b data-testid="books-end-message">{translations[locale].endTitle}</b>
        </p>
      }
    >
      <ul className="p-books">
        {books &&
          books.map((book, index) => (
            <li key={index} className="p-books__book">
              <Book {...book} />
            </li>
          ))}
      </ul>
    </InfiniteScroll>
  );
};

export default Books;
