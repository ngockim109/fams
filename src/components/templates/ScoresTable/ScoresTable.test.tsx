import { render, screen } from "@testing-library/react";
import ScoresTable from "./ScoresTable";
import MockScore from "../../../test-data/Scores/MockScore";

describe("ScoresTable Component", () => {
  const scores = MockScore;

  const mockCompletedExport = vi.fn();

  test("renders table with scores", () => {
    render(
      <ScoresTable
        scores={scores}
        loading={false}
        isExport={false}
        completedExport={mockCompletedExport}
        classId="class-1"
      />
    );

    // Check if the table renders
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();

    // Check if the scores are rendered in the table
    scores.forEach((score) => {
      const scoreNameElement = screen.getByText(score.StudentId);
      expect(scoreNameElement).toBeInTheDocument();
    });
  });
});
