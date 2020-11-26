import React from "react";
import ReactDom from "react-dom";
import Books from "../index";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { create } from "react-test-renderer";
import InfiniteScroll from "react-infinite-scroll-component";

const MockInfiniteScroll = () => {
  React.useEffect(() => {}, []);
  return (
    <div className="infinite-scroll-component__outerdiv" style={{}}>
      <div
        className="infinite-scroll-component "
        style={{
          WebkitOverflowScrolling: "touch",
          height: "auto",
          overflow: "auto",
        }}
      >
        <ul className="p-books" />
        <p className="p-books__end">
          <b data-testid="books-end-message">You have seen it all</b>
        </p>
      </div>
    </div>
  );
};

jest.mock("react-infinite-scroll-component", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(),
}));

beforeAll(() => {
  InfiniteScroll.mockImplementation(MockInfiniteScroll);
});

describe("Books Component", () => {
  afterEach(cleanup);

  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Books />, div);
  });

  it("Matches snapshot empty", () => {
    const app = create(<Books />).toJSON();
    expect(app).toMatchSnapshot();
  });
});
