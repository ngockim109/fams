import { render, screen, waitFor } from "@testing-library/react";
import ReserveInformation from "./ReserveInformation";
import MockReservedStudent from "../../../test-data/Students/MockReservedStudent";

describe("ReserveInformation component", () => {
  // Mock necessary dependencies and props
  const reservedStudent = MockReservedStudent[0];

  const mockClose = vi.fn();
  const mockHandleDataChange = vi.fn();
  const mockUpdateStatusInClass = vi.fn();

  test("Renders loading spinner when data is loading", async () => {
    render(
      <ReserveInformation
        data={reservedStudent}
        close={mockClose}
        handleDataChange={mockHandleDataChange}
        updateStatusInClass={mockUpdateStatusInClass}
      />
    );
    await waitFor(() => {
      const loadingSpinner = screen.getByTestId("loading-spinner");
      expect(loadingSpinner).toBeInTheDocument();
    });
  });

  test("Renders ReserveInformation component with no classes available", async () => {
    render(
      <ReserveInformation
        data={reservedStudent}
        close={mockClose}
        handleDataChange={mockHandleDataChange}
        updateStatusInClass={mockUpdateStatusInClass}
      />
    );

    // Wait for the loading spinner to be removed

    // Check if No class message is rendered
    await waitFor(() => {
      const loadingSpinner = screen.getByTestId("loading-spinner");
      expect(loadingSpinner).toBeInTheDocument();
    });

    // Check if No class message is rendered
    expect(screen.getByText("No class on Opening")).toBeInTheDocument();
  });
});
