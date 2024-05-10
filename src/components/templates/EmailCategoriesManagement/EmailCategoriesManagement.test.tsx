import { render, screen } from "@testing-library/react";
import EmailCategoriesManagement from "./EmailCategoriesManagement";
import MockEmailTemplate from "../../../test-data/Emails/MockEmailTemplate";

describe("EmailCategoriesManagement Component", () => {
  const mockEmailData = MockEmailTemplate;
  const mockLoading = false;
  const mockHandleDataChange = vi.fn();

  test("renders EmailCategoriesManagement with email data", () => {
    render(
      <EmailCategoriesManagement
        emailData={mockEmailData}
        loading={mockLoading}
        handleDataChange={mockHandleDataChange}
      />
    );

    // Check if the EmailTable component is rendered
    const emailTableElement = screen.getByRole("table");
    expect(emailTableElement).toBeInTheDocument();
  });
});
