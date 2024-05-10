import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import StudentTable from "./StudentTable";
import MockStudent from "../../../test-data/Students/MockStudent";

describe("StudentTable Component", () => {
  const students = MockStudent;

  test("renders table with correct columns", () => {
    render(
      <StudentTable
        student={students}
        loading={false}
        isExport={false}
        completedExport={vi.fn()}
        handleDataChange={vi.fn()}
        setStudentSelect={vi.fn()}
      />
    );

    expect(screen.getByText("Student ID")).toBeInTheDocument();
    expect(screen.getByText("Full name")).toBeInTheDocument();
    expect(screen.getByText("Birthday")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("GPA")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  test("selects rows on click", async () => {
    render(
      <StudentTable
        student={students}
        loading={false}
        isExport={false}
        completedExport={vi.fn()}
        handleDataChange={vi.fn()}
        setStudentSelect={vi.fn()}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]); // Select the second row

    await waitFor(() => {
      expect(checkboxes[1]).toBeChecked();
    });
  });

  test("exports data when isExport is true", async () => {
    const completedExportMock = vi.fn();
    render(
      <StudentTable
        student={students}
        loading={false}
        isExport
        completedExport={completedExportMock}
        handleDataChange={vi.fn()}
        setStudentSelect={vi.fn()}
      />
    );

    // Wait for export to complete
    await waitFor(() => {
      expect(completedExportMock).toHaveBeenCalled();
    });
  });
});
