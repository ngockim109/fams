import { render, screen } from "@testing-library/react";
import UserInfo from "./UserInfo";
import MockUser from "../../../test-data/Users/MockUser";

describe("UserInfo", () => {
  const userDetail = MockUser[0];
  test("renders UserInfo component with user details", () => {
    render(<UserInfo userDetail={userDetail} />);

    expect(screen.getByText("New Mr.A")).toBeInTheDocument();
  });
  test("avatar change modal is closed by default", () => {
    render(<UserInfo userDetail={userDetail} />);
    expect(screen.queryByText("Change Avatar"));
  });
});
