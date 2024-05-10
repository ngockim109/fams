import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import AddStudentsClass from "./AddStudentsClass";

const mockHandleDataChange = vi.fn();

describe("Add Student Class", () => {
  test("Modal opens when Add new button is clicked", () => {
    render(<AddStudentsClass handleDataChange={mockHandleDataChange} />);
    const addButton = screen.getByText("Add new");

    fireEvent.click(addButton);

    const modalTitle = screen.getByText("Add Student To Class");
    expect(modalTitle).toBeInTheDocument();

    const studentIdInput = screen.getByLabelText(
      "Student ID"
    ) as HTMLInputElement;
    expect(studentIdInput).toBeInTheDocument();
  });

  test("Search Functionality", async () => {
    render(<AddStudentsClass handleDataChange={mockHandleDataChange} />);
    const addButton = screen.getByText("Add new");
    fireEvent.click(addButton);
    const searchInput = screen.getByPlaceholderText("Input Student ID");
    const studentId = "123456";
    fireEvent.change(searchInput, { target: { value: studentId } });
    fireEvent.keyPress(searchInput, { key: "Enter", code: 13, charCode: 13 });
    await waitFor(() => {
      const fullNameInput = screen.getByLabelText("Student Name");
      expect(fullNameInput).toBeInTheDocument();
    });
  });

  test("resets form values on cancel button click", () => {
    render(<AddStudentsClass handleDataChange={mockHandleDataChange} />);
    const addButton = screen.getByText("Add new");
    fireEvent.click(addButton);

    const studentIdInput = screen.getByLabelText("Student ID");
    fireEvent.change(studentIdInput, { target: { value: "123" } });

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    const studentIdInputAfterReset = screen.getByLabelText(
      "Student ID"
    ) as HTMLInputElement;
    const fullNameInput = screen.getByLabelText(
      "Student Name"
    ) as HTMLInputElement;
    expect(studentIdInputAfterReset.value).toBe("");
    expect(fullNameInput.value).toBe("");
  });
});
