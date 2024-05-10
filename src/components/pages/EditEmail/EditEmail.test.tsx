import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EditEmail from "./EditEmail";

// Mock the localStorage getItem method
Storage.prototype.getItem = vi.fn(() => JSON.stringify({ uid: "user_id" }));

describe("EditEmail Component", () => {
  test("renders without crashing", () => {
    render(
      <Router>
        <EditEmail />
      </Router>
    );
  });
});
