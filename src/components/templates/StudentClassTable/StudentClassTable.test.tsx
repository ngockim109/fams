import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import StudentClassTable from "./StudentClassTable";
import MockStudentClass from "../../../test-data/Students/MockStudentClass";

describe("StudentClassTable Component", () => {
  const students = MockStudentClass;

  test("renders table with correct columns", () => {
    render(
      <StudentClassTable
        classStudent={students}
        loading={false}
        isExport={false}
        completedExport={vi.fn()}
        handleDataChange={vi.fn()}
        setStudentSelect={vi.fn()}
        classId="class_id"
      />
    );

    // Verify if each column header is present
    expect(screen.getByText("Student ID")).toBeInTheDocument();
    expect(screen.getByText("Full name")).toBeInTheDocument();
    expect(screen.getByText("Attending Status")).toBeInTheDocument();
    expect(screen.getByText("Final Score")).toBeInTheDocument();
    expect(screen.getByText("Certification Date")).toBeInTheDocument();
    expect(screen.getByText("Certification Status")).toBeInTheDocument();
    expect(screen.getByText("GPA Level")).toBeInTheDocument();
  });

  test("selects rows on click", async () => {
    render(
      <StudentClassTable
        classStudent={students}
        loading={false}
        isExport={false}
        completedExport={vi.fn()}
        handleDataChange={vi.fn()}
        setStudentSelect={vi.fn()}
        classId="class_id"
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    await waitFor(() => {
      expect(checkboxes[1]).toBeChecked();
    });
  });
});
