import { fireEvent, render, screen } from "@testing-library/react";
import AddReservingStudent from "./AddReservingStudent";

const mockHandleDataChange = () => {};

describe("AddReservingStudent", () => {
  // Render AddReservingStudent component
  const renderComponent = (props: { id?: string; isAddNew?: boolean } = {}) => {
    render(
      <AddReservingStudent
        id={props.id}
        handleDataChange={mockHandleDataChange}
        isAddNew={props.isAddNew}
      />
    );
  };
  it("should open modal when Add reserving button is clicked", async () => {
    renderComponent({ id: "Id" });
    fireEvent.click(screen.getByText("Add reserving"));
    const modalTitle = await screen.findByText("Reserving Details");
    expect(modalTitle).toBeInTheDocument();
  });
});
