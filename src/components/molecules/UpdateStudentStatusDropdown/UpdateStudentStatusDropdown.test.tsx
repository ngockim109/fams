import { render, screen, fireEvent } from "@testing-library/react";
import UpdateStudentStatusDropdown from "./UpdateStudentStatusDropdown";

describe("UpdateStudentStatusDropdown component", () => {
  test("Renders dropdown button with default text", () => {
    render(<UpdateStudentStatusDropdown />);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  test("Clicking on dropdown item triggers showModal function", () => {
    const mockShowModal = vi.fn();
    render(<UpdateStudentStatusDropdown showModal={mockShowModal} />);
    fireEvent.click(screen.getByText("Action"));
    fireEvent.click(screen.getByText("Update status student"));
    expect(mockShowModal).toHaveBeenCalled();
  });

  test("Dropdown item when isSelectedStudent prop is true", () => {
    render(<UpdateStudentStatusDropdown isSelectedStudent />);
    expect(screen.getByText("Action"));
  });
});
