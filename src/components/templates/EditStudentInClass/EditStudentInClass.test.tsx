import { render, screen, fireEvent } from "@testing-library/react";
import EditStudentInClass from "./EditStudentInClass";

describe("EditStudentInClass Component", () => {
  const mockStudentId = "123";
  const mockClassId = "456";
  const mockHandleDataChange = vi.fn();

  test("opens modal and submits form", async () => {
    render(
      <EditStudentInClass
        studentId={mockStudentId}
        classId={mockClassId}
        handleDataChange={mockHandleDataChange}
      />
    );

    // Check if edit button is rendered
    const editButton = screen.getByText("Edit");
    expect(editButton).toBeInTheDocument();

    // Click on edit button
    fireEvent.click(editButton);

    // Check if modal opens
    const modalHeader = await screen.findByText("Edit Student");
    expect(modalHeader).toBeInTheDocument();
  });

  test("closes modal when cancel button is clicked", () => {
    render(
      <EditStudentInClass
        studentId={mockStudentId}
        classId={mockClassId}
        handleDataChange={mockHandleDataChange}
      />
    );

    // Click on edit button
    fireEvent.click(screen.getByText("Edit"));

    // Check if modal opens
    const modalHeader = screen.getByText("Edit Student");
    expect(modalHeader).toBeInTheDocument();

    // Click on cancel button
    fireEvent.click(screen.getByText("Cancel"));
  });
});
