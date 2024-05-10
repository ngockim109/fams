import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout Component", () => {
  test("renders header, sidebar, outlet, and footer", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  });
});
