import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddClassToStudent from "./AddClassToStudent";
import MockStudent from "../../../test-data/Students/MockStudent";

describe("AddClassToStudent component", () => {
  it("renders the component and opens the modal when Add button is clicked", async () => {
    render(
      <AddClassToStudent
        data={MockStudent[0]}
        isDisabled
        handleDataChange={vi.fn()}
      />
    );

    // Check if Add button is rendered by class name
    const addButton = screen.getByRole("button", { name: "" });
    expect(addButton).toBeInTheDocument();

    // Click on the Add button
    fireEvent.click(addButton);

    // Wait for the modal to appear
    await waitFor(() => {
      const modalTitle = screen.getByText("Add Class To Student");
      expect(modalTitle).toBeInTheDocument();
    });

    // Check if the modal is open
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });
});
