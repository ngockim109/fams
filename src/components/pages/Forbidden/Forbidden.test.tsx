import { render, screen } from "@testing-library/react";
import Forbidden from "./Forbidden";

describe("Forbidden component", () => {
  test("should render 403 page with correct content", () => {
    render(<Forbidden />);

    // Check if the status code is displayed correctly
    expect(screen.getByText("403")).toBeInTheDocument();

    // Check if the title and subtitle are rendered correctly
    expect(
      screen.getByText("Sorry, you are not authorized to access this page.")
    ).toBeInTheDocument();

    // Check if the "Back Home" button is rendered correctly with the correct href attribute
    const backButton = screen.getByRole("link", { name: /Back Home/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");
  });
});
