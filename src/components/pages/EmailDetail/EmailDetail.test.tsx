import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EmailDetail from "./EmailDetail";

describe("EmailDetail Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <EmailDetail />
      </Router>
    );
  });
});
