import { render, screen, fireEvent } from "@testing-library/react";
import UpdateStudentStatusModal from "./UpdateStudentStatusModal";
import MockStudent from "../../../test-data/Students/MockStudent";

describe("UpdateStudentStatusModal component", () => {
  const mockStudentSelect = MockStudent;

  test("Renders modal with correct title", () => {
    const setStatusStudent = vi.fn();
    const handleOk = vi.fn();
    const handleCancel = vi.fn();
    render(
      <UpdateStudentStatusModal
        studentSelect={mockStudentSelect}
        isModalOpen
        handleOk={handleOk}
        handleCancel={handleCancel}
        setStatusStudent={setStatusStudent}
      />
    );
    expect(screen.getByText("Update status")).toBeInTheDocument();
  });

  test("Displays correct number of students in the message", () => {
    const setStatusStudent = vi.fn();
    const handleOk = vi.fn();
    const handleCancel = vi.fn();
    render(
      <UpdateStudentStatusModal
        studentSelect={mockStudentSelect}
        isModalOpen
        handleOk={handleOk}
        handleCancel={handleCancel}
        setStatusStudent={setStatusStudent}
      />
    );
    expect(
      screen.getByText(
        `Are sure you update status ${mockStudentSelect.length} Student?`
      )
    ).toBeInTheDocument();
  });

  test("Clicking on 'Save' button triggers handleOk function", () => {
    const setStatusStudent = vi.fn();
    const handleOk = vi.fn();
    const handleCancel = vi.fn();
    render(
      <UpdateStudentStatusModal
        studentSelect={mockStudentSelect}
        isModalOpen
        handleOk={handleOk}
        handleCancel={handleCancel}
        setStatusStudent={setStatusStudent}
      />
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(handleOk).toHaveBeenCalledTimes(1);
  });
});
