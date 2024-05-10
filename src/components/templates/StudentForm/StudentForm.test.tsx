import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import StudentForm from "./StudentForm";

describe("StudentForm Component", () => {
  const mockOnFinish = vi.fn();
  const mockHandleDataChange = vi.fn();

  test("renders form fields correctly", () => {
    render(
      <BrowserRouter>
        <StudentForm
          onFinish={mockOnFinish}
          handleDataChange={mockHandleDataChange}
          formName="testForm"
        />
      </BrowserRouter>
    );

    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Other")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("submits form with correct values", () => {
    render(
      <BrowserRouter>
        <StudentForm
          onFinish={mockOnFinish}
          handleDataChange={mockHandleDataChange}
          formName="testForm"
        />
      </BrowserRouter>
    );
  });
});
