import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";

describe("Login Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });
});
