import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReservingStudentSearch from "./ReservingStudentSearch";

describe("ReservingStudentSearch component", () => {
  test("renders ReservingStudentSearch component correctly", () => {
    render(
      <ReservingStudentSearch
        getStudentByID={() => {}}
        setSearchStudentId={() => {}}
      />
    );

    const studentIdInput = screen.getByPlaceholderText("Input Student ID");
    expect(studentIdInput).toBeInTheDocument();
  });

  test("calls getStudentByID function with correct student ID when searched", async () => {
    // Mock functions
    const mockGetStudentByID = () => {};
    const mockSetSearchStudentId = () => {};

    render(
      <ReservingStudentSearch
        getStudentByID={mockGetStudentByID}
        setSearchStudentId={mockSetSearchStudentId}
      />
    );

    const studentIdInput = screen.getByPlaceholderText("Input Student ID");
    fireEvent.change(studentIdInput, { target: { value: "123456" } });
    fireEvent.keyPress(studentIdInput, {
      key: "Enter",
      code: 13,
      charCode: 13,
    });

    await waitFor(() => {
      // Your assertion here
    });
  });

  test("displays error message when no student ID is entered", async () => {
    // Mock functions
    const mockGetStudentByID = () => {};
    const mockSetSearchStudentId = () => {};

    render(
      <ReservingStudentSearch
        getStudentByID={mockGetStudentByID}
        setSearchStudentId={mockSetSearchStudentId}
      />
    );

    const studentIdInput = screen.getByPlaceholderText("Input Student ID");
    fireEvent.change(studentIdInput, { target: { value: "" } });
    fireEvent.keyPress(studentIdInput, {
      key: "Enter",
      code: 13,
      charCode: 13,
    });

    await waitFor(() => {
      // Your assertion here
    });
  });
});
