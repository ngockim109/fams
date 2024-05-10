import { render, screen } from "@testing-library/react";
import StudentChart from "./StudentChart";
import MockDashboardData from "../../../test-data/Dashboard/MockDashboardData";

describe("StudentChart Component", () => {
  const dashboardData = MockDashboardData[0];

  test("renders student chart with correct data", () => {
    render(<StudentChart dashboard={dashboardData} />);

    // Check if the title is rendered
    expect(
      screen.getByText("Incoming & Graduated Student")
    ).toBeInTheDocument();

    // Check if the dropdown title is rendered with default year
    expect(screen.getByText("Data for 2022")).toBeInTheDocument();

    // Check if the chart is rendered
    expect(screen.getByRole("region")).toBeInTheDocument(); // Assuming the chart is rendered as a region
  });
});
