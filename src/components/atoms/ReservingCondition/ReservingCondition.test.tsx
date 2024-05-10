import { render, screen } from "@testing-library/react";
import ReservingCondition from "./ReservingCondition";

describe("ReservingCondition component", () => {
  // Test Case 1: Rendering with reserving conditions

  test("renders with reserving conditions", () => {
    render(<ReservingCondition disable={false} />);

    expect(
      screen.getByLabelText("Complete tuition payment")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ensure the course has not progressed beyond 50%")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Determine retention fee payment")
    ).toBeInTheDocument();
  });

  // Test Case 2: Rendering with disabled reserving conditions
  test("renders with disabled reserving conditions", () => {
    render(<ReservingCondition disable />);
    expect(
      screen.getByLabelText("Complete tuition payment")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Ensure the course has not progressed beyond 50%")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Determine retention fee payment")
    ).toBeInTheDocument();
  });
});
