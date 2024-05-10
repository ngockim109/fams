import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DisableModal from "./DisableModal";

describe("DisableModal Component", () => {
  it("renders DisableModal correctly", async () => {
    // Arrange
    render(
      <DisableModal
        handleOk={() => {}}
        modalTitle="Disable Student"
        buttonText="Disable"
      />
    );

    // Act
    const disableButton = screen.getByText("Disable");
    fireEvent.click(disableButton);

    // Assert
    await waitFor(() => {
      const modalContent = screen.getByText(/Are you sure to disable/i);
      expect(modalContent).toBeInTheDocument();
    });

    // Verify that the modal is closed
    await waitFor(() => {
      const closedModalContent = screen.queryByText(/Are you sure to disable/i);
      expect(closedModalContent).toBeNull;
    });
  });
});
