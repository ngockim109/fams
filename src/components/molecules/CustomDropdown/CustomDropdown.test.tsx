import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomDropdown from "./CustomDropdown";
import RouterEndpoints from "../../../constants/RouterEndpoints";

describe("CustomDropdown Component", () => {
  // Mock function to simulate handleDataChange
  const mockHandleDataChange = () => {};

  test("should render correctly", () => {
    render(
      <MemoryRouter>
        <CustomDropdown
          handleDataChange={mockHandleDataChange}
          id="1"
          viewLink={RouterEndpoints.StudentsManagement}
          isDelete
        />
      </MemoryRouter>
    );

    // Check if the dropdown component is rendered
    const dropdownComponent = screen.getByRole("button");
    expect(dropdownComponent).toBeInTheDocument();

    // Simulate a click on the dropdown component
    fireEvent.click(dropdownComponent);
  });
});
