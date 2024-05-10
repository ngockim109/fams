import { render, screen } from "@testing-library/react";
import ReservedTable from "./ReservedTable";
import MockReservedStudent from "../../../test-data/Students/MockReservedStudent";

describe("ReservedTable Component", () => {
  const reservedStudent = MockReservedStudent;

  const mockCompletedExport = vi.fn();
  const mockHandleDataChange = vi.fn();

  test("renders table with reserved students", () => {
    render(
      <ReservedTable
        reservedStudent={reservedStudent}
        loading={false}
        isExport={false}
        completedExport={mockCompletedExport}
        handleDataChange={mockHandleDataChange}
      />
    );

    // Check if the table renders
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();

    // Check if the reserved students are rendered in the table
    reservedStudent.forEach((student) => {
      const studentNameElements = screen.getAllByText(student.FullName);
      expect(studentNameElements.length).toBeGreaterThan(0);
    });
  });
});
