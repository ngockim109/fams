import { render, screen } from "@testing-library/react";
import ServerError from "./ServerError";

describe("ServerError component", () => {
  test("should render 500 page with correct content", () => {
    render(<ServerError />);

    // Check if the status code is displayed correctly
    expect(screen.getByText("500")).toBeInTheDocument();

    // Check if the title and subtitle are rendered correctly
    expect(
      screen.getByText("Sorry, something went wrong.")
    ).toBeInTheDocument();

    // Check if the "Back Home" button is rendered correctly with the correct href attribute
    const backButton = screen.getByRole("link", { name: /Back Home/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");
  });
});
