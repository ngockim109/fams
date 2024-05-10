import { render, screen } from "@testing-library/react";
import TemplateDashboard from "./TemplateDashboard";

describe("TemplateDashboard Component", () => {
  test("renders loading spinner when loading is true", () => {
    render(<TemplateDashboard />);
    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toBeInTheDocument();
  });
  test("handles null or unavailable dashboard data", () => {
    render(<TemplateDashboard />);
  });
});
