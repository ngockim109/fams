import { render, screen } from "@testing-library/react";
import PercentChart from "./PercentChart";

// Mock data for testing
const testData = [
  { name: "Category 1", value: 25 },
  { name: "Category 2", value: 35 },
  { name: "Category 3", value: 20 },
  { name: "Category 4", value: 20 },
];

describe("PercentChart component", () => {
  it("renders with provided data", () => {
    render(<PercentChart data={testData} isResult />);
    const chartComponent = screen.getByTestId("percent-chart");
    expect(chartComponent).toBeInTheDocument();
  });
});
