import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

describe("NotFound component", () => {
  test("should render 404 page with correct content", () => {
    render(<NotFound />);

    // Check if the status code is displayed correctly
    expect(screen.getByText("404")).toBeInTheDocument();

    // Check if the title and subtitle are rendered correctly
    expect(
      screen.getByText("Sorry, the page you visited does not exist.")
    ).toBeInTheDocument();

    // Check if the "Back Home" button is rendered correctly with the correct href attribute
    const backButton = screen.getByRole("link", { name: /Back Home/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");
  });
});
