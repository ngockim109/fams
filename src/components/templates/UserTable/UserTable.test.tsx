import { render, screen } from "@testing-library/react";
import UserTable from "./UserTable";
import MockUser from "../../../test-data/Users/MockUser";

describe("UserTable Component", () => {
  const mockUsers = MockUser;

  test("renders user table with correct data", () => {
    render(
      <UserTable
        user={mockUsers}
        loading={false}
        isExport={false}
        completedExport={vi.fn()}
        handleDataChange={vi.fn()}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("User Role")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
