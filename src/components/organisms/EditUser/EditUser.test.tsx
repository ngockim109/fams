import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditUser from "./EditUser";

describe("EditUser", () => {
  it("should open modal when Edit button is clicked", async () => {
    const id = "123";
    const handleDataChangeMock = () => {};

    render(<EditUser id={id} handleDataChange={handleDataChangeMock} />);

    fireEvent.click(screen.getByText("Edit"));

    await waitFor(() => {
      expect(screen.getByText("Edit user")).toBeInTheDocument();
    });
  });
});
