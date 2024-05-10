import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EmailsManagement from "./EmailsManagement";

describe("EmailsManagement Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <EmailsManagement />
      </Router>
    );
  });
});
