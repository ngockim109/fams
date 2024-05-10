import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Profile from "./Profile";

describe("Profile Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <Profile />
      </Router>
    );
  });
});
