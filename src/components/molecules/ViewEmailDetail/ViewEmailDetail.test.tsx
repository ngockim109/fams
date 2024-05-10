import { render, screen } from "@testing-library/react";
import ViewEmailDetail from "./ViewEmailDetail";
import MockEmailTemplate from "../../../test-data/Emails/MockEmailTemplate";

describe("ViewEmailDetail component", () => {
  const mockEmailData = MockEmailTemplate[0];

  test("Renders email details correctly", () => {
    render(<ViewEmailDetail data={mockEmailData} />);

    // Check for email details
    expect(screen.getByText("Email name")).toBeInTheDocument();
    expect(screen.getByText("Inform")).toBeInTheDocument();

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Inform for student")).toBeInTheDocument();
    expect(
      screen.getByText("Inform for student about new information")
    ).toBeInTheDocument();

    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(
      screen.getByText("Inform the student about new information")
    ).toBeInTheDocument();

    expect(screen.getByText("Apply to")).toBeInTheDocument();
    expect(screen.getByText("Student")).toBeInTheDocument();

    expect(screen.getByText("Created on")).toBeInTheDocument();
    expect(screen.getByText("22/03/2024")).toBeInTheDocument();

    expect(screen.getByText("Created by")).toBeInTheDocument();
    expect(screen.getByText("Mr.A")).toBeInTheDocument();

    // Check for content collapse
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
