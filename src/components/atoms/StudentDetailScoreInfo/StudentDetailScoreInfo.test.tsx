import { render, screen } from "@testing-library/react";
import StudentDetailScoreInfo from "./StudentDetailScoreInfo";
import MockStudentScore from "../../../test-data/Scores/MockStudentScore";

describe("StudentDetailScoreInfo Component", () => {
  const mockStudentScore = MockStudentScore;
  test("renders student score information correctly", () => {
    render(
      <StudentDetailScoreInfo
        studentScore={mockStudentScore}
        className="Test Class"
        classId="Test Class ID"
      />
    );

    // Check if class name and class ID are rendered
    expect(screen.getByText("Test Class")).toBeInTheDocument();
    expect(screen.getByText("Test Class ID")).toBeInTheDocument();
  });
  test("renders null when student score is null", () => {
    render(
      <StudentDetailScoreInfo
        studentScore={null}
        className="Test Class"
        classId="Test Class ID"
      />
    );

    // Check if null is rendered
    expect(screen.queryByText("Test Class")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Class ID")).not.toBeInTheDocument();
  });
});
