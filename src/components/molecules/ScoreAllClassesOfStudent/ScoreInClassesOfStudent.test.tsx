import { render, screen } from "@testing-library/react";
import ScoreInClassesOfStudent from "./ScoreInClassesOfStudent";

describe("ScoreInClassesOfStudent component", () => {
  it("renders loading spinner while data is being fetched", () => {
    const attendeeID = "123";

    render(<ScoreInClassesOfStudent attendeeID={attendeeID} />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
