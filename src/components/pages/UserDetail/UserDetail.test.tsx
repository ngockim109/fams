import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UserDetail from "./UserDetail";

describe("User Detail Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <UserDetail />
      </Router>
    );
  });
});
