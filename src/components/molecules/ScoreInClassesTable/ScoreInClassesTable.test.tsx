import { render, screen } from "@testing-library/react";
import ScoreInClassesTable from "./ScoreInClassesTable";

describe("ScoreInClassesTable component", () => {
  it("renders loading state", () => {
    render(<ScoreInClassesTable scores={[]} loading />);

    // Check if loading spinner is rendered
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
