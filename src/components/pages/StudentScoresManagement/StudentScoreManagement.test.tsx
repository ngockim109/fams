import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import StudentScoresManagement from "./StudentScoresManagement";

describe("StudentScoresManagement Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <StudentScoresManagement />
      </Router>
    );
  });
});
