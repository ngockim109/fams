import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EditScore from "./EditScore";

describe("EditScore Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <EditScore />
      </Router>
    );
  });
});
