import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import StudentsManagement from "./StudentsManagement";

describe("Students Management Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <StudentsManagement />
      </Router>
    );
  });
});
