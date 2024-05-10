import { render, screen } from "@testing-library/react";
import ActionTitle from "./ActionTitle";

describe("ActionTitle component", () => {
  test("renders ActionTitle component correctly", () => {
    // Render the component
    render(<ActionTitle />);

    // Get the rendered component by data-testid
    const actionTitleComponent = screen.getByTestId("action-title");

    // Assert that the component is rendered correctly
    expect(actionTitleComponent).toBeInTheDocument();
  });
});
