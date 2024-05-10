import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Badge from "./Badge";
import Colors from "../../../constants/Colors";

describe("Badge component", () => {
  it("renders the badge with the correct color and tooltip", async () => {
    const color = Colors.LightGreen;
    const tooltip = "This is a tooltip";

    render(<Badge color={color} tooltip={tooltip} />);

    const badge = screen.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    fireEvent.mouseEnter(badge);

    await waitFor(() => {
      const tooltipContent = screen.getByText(tooltip);
      expect(tooltipContent).toBeInTheDocument();
    });
  });
});
