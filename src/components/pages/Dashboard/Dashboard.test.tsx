import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  });
});
