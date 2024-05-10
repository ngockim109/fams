import { render, screen } from "@testing-library/react";
import EmailOtherManagement from "./EmailOtherManagement";
import MockEmailTemplate from "../../../test-data/Emails/MockEmailTemplate";

describe("EmailOtherManagement Component", () => {
  const mockEmailData = MockEmailTemplate;

  const mockLoading = false;
  const mockHandleDataChange = vi.fn();

  test("renders EmailTable with filtered email data", () => {
    render(
      <EmailOtherManagement
        emailData={mockEmailData}
        loading={mockLoading}
        handleDataChange={mockHandleDataChange}
      />
    );

    // Check if the EmailTable component is rendered
    const emailTableElement = screen.getByRole("table");
    expect(emailTableElement).toBeInTheDocument();

    // Check if the filtered email data is rendered in the EmailTable
    const filteredEmailData = mockEmailData.filter(
      (email) =>
        email.Type !== "Reservation" &&
        email.Type !== "Inform" &&
        email.Type !== "Remind" &&
        email.Type !== "Score"
    );
    filteredEmailData.forEach((email) => {
      const emailTypeElement = screen.getByText(email.Type);
      expect(emailTypeElement).toBeInTheDocument();
    });
  });
});
