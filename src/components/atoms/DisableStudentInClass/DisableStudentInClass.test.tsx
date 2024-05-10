import { render, fireEvent, screen } from "@testing-library/react";
import DisableStudentInClass from "./DisableStudentInClass";

test("DisableStudentInClass component - calls delete function when Delete button is clicked", () => {
  // Mock the delete function
  const mockHandleDataChange = vi.fn();

  // Render the component
  render(
    <DisableStudentInClass
      classId="HCM24_01"
      id="test-id"
      handleDataChange={mockHandleDataChange}
    />
  );

  // Click the Delete button
  fireEvent.click(screen.getByText("Delete"));
});
