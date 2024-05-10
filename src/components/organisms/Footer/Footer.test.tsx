// This function block is use to test content of footer when rendering

import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("should render correctly content", async () => {
    render(<Footer />);
    // Find element with contain "Copyright @2022 BA Warrior. All right reserved"
    const contentElement = await screen.findByText(
      "Copyright @2022 BA Warrior. All right reserved"
    );
    // Check element is exit or not
    expect(contentElement).toBeInTheDocument();
  });
});
