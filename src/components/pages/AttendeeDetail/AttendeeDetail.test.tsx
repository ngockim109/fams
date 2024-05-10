import { render } from "@testing-library/react";
import AttendeeDetail from "./AttendeeDetail";

describe("AttendeeDetail Component", () => {
  test("renders without crashing", () => {
    render(<AttendeeDetail />);
  });
});
