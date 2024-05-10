import { render, screen } from "@testing-library/react";
import EmailTable from "./EmailTable";
import MockEmailTemplate from "../../../test-data/Emails/MockEmailTemplate";

describe("EmailTable Component", () => {
  const mockEmails = MockEmailTemplate;
  const mockLoading = false;
  const mockHandleDataChange = vi.fn();

  test("renders table with email data", () => {
    render(
      <EmailTable
        email={mockEmails}
        loading={mockLoading}
        handleDataChange={mockHandleDataChange}
      />
    );

    // Check if the table renders
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
});
