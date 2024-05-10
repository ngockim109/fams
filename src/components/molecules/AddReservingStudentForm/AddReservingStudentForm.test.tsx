import { render, screen } from "@testing-library/react";
import AddReservingStudentForm from "./AddReservingStudentForm";

describe("AddReservingStudentForm Component", () => {
  const handleOk = vi.fn();
  const setIsReset = vi.fn();
  test("displays input field for student ID", () => {
    render(
      <AddReservingStudentForm
        handleOk={handleOk}
        id="123"
        isAddNew
        isReset={false}
        setIsReset={setIsReset}
      />
    );

    // Assert that the input field for student ID is displayed
    expect(screen.getByLabelText("Student ID")).toBeInTheDocument();
  });

  test("displays search button for selecting classes", () => {
    render(
      <AddReservingStudentForm
        handleOk={handleOk}
        id="123"
        isAddNew
        isReset={false}
        setIsReset={setIsReset}
      />
    );

    // Assert that the search button for selecting classes is displayed
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });
});
