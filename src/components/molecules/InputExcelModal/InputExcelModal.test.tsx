/* eslint-disable react/jsx-props-no-spreading */
import { render, screen, fireEvent } from "@testing-library/react";
import InputExcelModal from "./InputExcelModal";

test("renders InputExcelModal component", () => {
  const mockProps = {
    isModalOpen: true,
    handleCancel: vi.fn(),
    excelUpload: vi.fn(),
    href: "/template.xlsx",
    fileDownload: "template.xlsx",
  };

  render(<InputExcelModal importId="1" {...mockProps} />);

  const modalTitle = screen.getByText("Import file");
  const cancelButton = screen.getByRole("button", { name: /cancel/i });
  const downloadButton = screen.getByText(/download template/i);

  // Add this line before the assertions
  // eslint-disable-next-line testing-library/no-debugging-utils
  console.log(screen.debug());

  expect(modalTitle).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  expect(downloadButton).toBeInTheDocument();

  fireEvent.click(cancelButton);
  // You might not be able to track handleCancel calls without using jest.fn()

  fireEvent.click(downloadButton);
  // You might not be able to track handleCancel calls without using jest.fn()
});
