import { render } from "@testing-library/react";
import ClassDetail from "./ClassDetail";

describe("ClassDetail Component", () => {
  test("renders without crashing", () => {
    render(<ClassDetail />);
  });
});
