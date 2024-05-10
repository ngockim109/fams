import { render, screen } from "@testing-library/react";
import EmailACateManagement from "./EmailACateManagement";
import MockEmailTemplate from "../../../test-data/Emails/MockEmailTemplate";

describe("EmailACateManagement Component", () => {
  const mockCateFilter = "Type1";
  const mockEmailData = MockEmailTemplate;
  const mockLoading = false;
  const mockHandleDataChange = vi.fn();

  test("renders EmailACateManagement with filtered email data", () => {
    render(
      <EmailACateManagement
        cateFilter={mockCateFilter}
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
