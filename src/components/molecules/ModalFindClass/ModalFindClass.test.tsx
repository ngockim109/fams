import { render, screen, fireEvent } from "@testing-library/react";
import ModalFindClass from "./ModalFindClass";
import MockReservedStudent from "../../../test-data/Students/MockReservedStudent";

describe("ModalFindClass Component", () => {
  it("renders ModalFindClass component", () => {
    const reservedStudent = MockReservedStudent[0];

    const mockProps = {
      data: reservedStudent,
      open: true,
      handleDataChange: () => {},
      updateStatusInClass: () => {},
      close: () => {},
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    render(<ModalFindClass {...mockProps} />);

    // Assertions for the initial render
    const modalTitle = screen.getByText("Reserving Details");

    // Use getByRole to find the button by its role
    const cancelButton = screen.getByRole("button");
    const okButton = screen.getByRole("button");

    expect(modalTitle).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(okButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    fireEvent.click(okButton);

    fireEvent.click(modalTitle);
  });
});
