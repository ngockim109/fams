import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import StudentsClassManagement from "./StudentsClassManagement";

describe("StudentClassManagement Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <StudentsClassManagement />
      </Router>
    );
  });
});
