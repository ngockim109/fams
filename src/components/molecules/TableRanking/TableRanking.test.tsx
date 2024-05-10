import { render, screen } from "@testing-library/react";
import TableRanking from "./TableRanking";
import MockDashboardData from "../../../test-data/Dashboard/MockDashboardData";

describe("TableRanking component", () => {
  const dashboardMock = MockDashboardData[0];
  test("renders table ranking with initial data", () => {
    render(<TableRanking dashboard={dashboardMock} />);

    // Check if the title header is rendered
    expect(
      screen.getByText("Top 3 highest grades students")
    ).toBeInTheDocument();

    // Check if the default time ranking is rendered
    expect(screen.getByText("2022 - Semester 1")).toBeInTheDocument();

    // Check if the table columns are rendered
    expect(screen.getByText("Rank")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("GPA")).toBeInTheDocument();

    // Check if the data rows are rendered
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });
});
