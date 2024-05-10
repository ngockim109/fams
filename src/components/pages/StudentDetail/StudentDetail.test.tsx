import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import StudentDetail from "./StudentDetail";

describe("StudentDetail Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <StudentDetail />
      </Router>
    );
  });
});
