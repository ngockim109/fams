import { render, screen } from "@testing-library/react";
import EmailChart from "./EmailChart";

describe("EmailChart component", () => {
  it("renders the PercentChart component with correct data", () => {
    render(
      <EmailChart
        totalEmailTemplate={100}
        totalEmailReserve={20}
        totalEmailRemind={30}
        totalEmailNotice={25}
        totalEmailScore={10}
      />
    );

    // Check if the EmailChart component is rendered
    const emailChartElement = screen.getByTestId("email-chart");
    expect(emailChartElement).toBeInTheDocument();

    // Check if the PercentChart component is rendered inside the EmailChart component
    const percentChartElement = screen.getByTestId("percent-chart");
    expect(percentChartElement).toBeInTheDocument();
  });
});
