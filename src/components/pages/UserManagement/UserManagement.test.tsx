import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserManagement from "./UserManagement";

describe("UserManagement Component", () => {
  test("should render without crashing", () => {
    render(
      <MemoryRouter>
        <UserManagement />
      </MemoryRouter>
    );
  });

  test("should display User Management", async () => {
    render(
      <MemoryRouter>
        <UserManagement />
      </MemoryRouter>
    );

    expect(screen.getByText("User Management")).toBeInTheDocument();
  });

  it("handles export data click", async () => {
    render(
      <MemoryRouter>
        <UserManagement />
      </MemoryRouter>
    );
    const exportButton = screen.getByText("Export");

    fireEvent.click(exportButton);
  });
});
