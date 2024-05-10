import { render, screen } from "@testing-library/react";
import GenderChart from "./GenderChart";

describe("GenderChart component", () => {
  it("renders the PercentChart component with correct data", () => {
    const totalMale = 30;
    const totalStudent = 50;

    render(<GenderChart totalMale={totalMale} totalStudent={totalStudent} />);

    // Check if the GenderChart component is rendered
    const genderChartElement = screen.getByTestId("percent-chart");
    expect(genderChartElement).toBeInTheDocument();

    // Check if the data is rendered correctly
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          content.startsWith("Male") &&
          element?.tagName?.toLowerCase() === "div"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) =>
          content.startsWith("Female") &&
          element?.tagName?.toLowerCase() === "div"
      )
    ).toBeInTheDocument();
  });
});
