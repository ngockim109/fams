import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EditStudent from "./EditStudent";

describe("EditStudent Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <EditStudent />
      </Router>
    );
  });
});
