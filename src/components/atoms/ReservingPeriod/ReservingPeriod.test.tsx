import { render, screen } from "@testing-library/react"; // Assuming you have a custom test-utils for rendering components

import ReservingPeriod from "./ReservingPeriod";

describe("ReservingPeriod Component", () => {
  it("renders the component with a RangePicker", async () => {
    render(<ReservingPeriod />);

    // Check if the RangePicker is rendered
    const rangePicker = screen.getByLabelText("Reserving period");
    expect(rangePicker).toBeInTheDocument();
  });
  // Add more tests if needed
  test("renders ReservingPeriod component", () => {
    render(<ReservingPeriod />);
    const labelElement = screen.getByText("Reserving period");
    expect(labelElement).toBeInTheDocument();
  });
});
