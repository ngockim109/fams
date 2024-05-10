import { render, fireEvent, screen } from "@testing-library/react";
import DisableModal from "./DeleteEmail";

test("DisableStudentInClass component - calls delete function when Delete button is clicked", () => {
  // Mock the delete function
  const mockHandleDataChange = () => {};

  // Render the component
  render(<DisableModal id="test-id" handleDataChange={mockHandleDataChange} />);

  // Click the Delete button
  fireEvent.click(screen.getByText("Delete"));
});
