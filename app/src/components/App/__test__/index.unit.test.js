import React from "react";
import ReactDom from "react-dom";
import App from "../index";
import { render, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { create } from "react-test-renderer";

jest.mock("../../Books", () => () => <div></div>);

describe("App Component", () => {
  afterEach(cleanup);

  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<App />, div);
  });

  it("Renders app correctly", () => {
    let result = null;
    act(() => {
      result = render(<App />);
    });

    expect(result.getByTestId("app-title")).toHaveTextContent(
      "Books You Might Like"
    );
  });

  it("Matches snapshot empty", () => {
    const app = create(<App />).toJSON();
    expect(app).toMatchSnapshot();
  });
});
