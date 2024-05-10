import { render, screen } from "@testing-library/react";
import DisableStudent from "./DisableStudent";

test("should render Delete button", () => {
  render(<DisableStudent id="123" handleDataChange={() => {}} />);

  // Your assertions for the initial render go here
  const deleteButton = screen.getByText("Delete");
  expect(deleteButton).toBeInTheDocument();
});
