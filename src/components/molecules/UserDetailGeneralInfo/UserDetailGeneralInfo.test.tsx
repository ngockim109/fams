import { render, screen } from "@testing-library/react";
import UserDetailGeneralInfo from "./UserDetailGeneralInfo";
import MockUser from "../../../test-data/Users/MockUser";

describe("UserDetailGeneralInfo component", () => {
  const mockUserDetail = MockUser[0];

  test("Renders general information correctly", () => {
    render(<UserDetailGeneralInfo userDetail={mockUserDetail} />);

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
