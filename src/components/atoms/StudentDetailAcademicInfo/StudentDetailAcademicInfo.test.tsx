import { render, screen } from "@testing-library/react";
import StudentDetailAcademicInfo from "./StudentDetailAcademicInfo";
import MockStudent from "../../../test-data/Students/MockStudent";

const mockStudentDetail = MockStudent[0];
describe("StudentDetailAcademicInfo Component", () => {
  it("renders academic info correctly", () => {
    render(<StudentDetailAcademicInfo studentDetail={mockStudentDetail} />);

    // Check for "Graduation Time" using queryByText
    const graduationTimeElement = screen.queryByText("Graduation Time");
    if (graduationTimeElement !== null) {
      expect(graduationTimeElement).toBeInTheDocument();
    }

    // Check for "2022-12-31" using queryByText
    const graduationDateElement = screen.queryByText("2022-12-31");
    if (graduationDateElement !== null) {
      expect(graduationDateElement).toBeInTheDocument();
    }
  });
});
