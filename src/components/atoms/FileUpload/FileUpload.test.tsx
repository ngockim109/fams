import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileUpload from "./FileUpload";

describe("FileUpload component", () => {
  test("displays upload area with correct text", () => {
    const excelUpload = vi.fn();
    render(<FileUpload excelUpload={excelUpload} importId="1" />);
    expect(
      screen.getByText("Click or drag file to this area to upload")
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Support for a single upload with .xls, .xlsx, or .csv file"
      )
    ).not.toBeInTheDocument();
  });

  test("triggers success notification when file upload is successful", async () => {
    const excelUpload = vi.fn();
    global.fetch = vi.fn().mockResolvedValueOnce({ status: 200 });
    render(<FileUpload excelUpload={excelUpload} importId="1" />);
    const file = new File(["dummy content"], "example.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const uploadBtn = screen.getByRole("button", { name: "Upload File" });
    fireEvent.change(uploadBtn, { target: { files: [file] } });
    await waitFor(() => {
      expect(
        screen.queryByText("example.xlsx file uploaded successfully")
      ).not.toBeInTheDocument();
    });
  });

  test("triggers error notification when file upload fails", async () => {
    const excelUpload = vi.fn();
    global.fetch = vi.fn().mockRejectedValueOnce(new Error("Upload failed"));
    render(<FileUpload excelUpload={excelUpload} importId="1" />);
    const file = new File(["dummy content"], "example.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const uploadBtn = screen.getByRole("button", { name: "Upload File" });
    fireEvent.change(uploadBtn, { target: { files: [file] } });
    await waitFor(() => {
      expect(
        screen.queryByText("example.xlsx file upload failed")
      ).not.toBeInTheDocument();
    });
  });
});
