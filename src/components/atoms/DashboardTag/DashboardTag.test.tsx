import { render, screen } from "@testing-library/react";
import DashboardTag from "./DashboardTag";

describe("DashboardTag component", () => {
  test("renders DashboardTag correctly", () => {
    const title = "Title";
    const content = 123;
    const unit = "Unit";
    const icon = <svg>Icon</svg>;

    render(
      <DashboardTag title={title} content={content} unit={unit} icon={icon} />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content.toString())).toBeInTheDocument();
    expect(screen.getByText(unit)).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });
});
