// This describe block is use to test sidebar component when
//  - user clicks on content to navigate and this element must be selected
//  - user click on content to open all children

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SideBar from "./SideBar";

describe("Sidebar Component", () => {
  // Check when user clicks on title "scores", web will navigate to /scores from /home
  test("should selected when user click on title do not have any children title", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SideBar />
      </MemoryRouter>
    );
    // Find element containing content "Class"
    const scoresLink = await screen.findByText("Class management");
    // eslint-disable-next-line testing-library/no-node-access
    const scoresLiEL = scoresLink.closest("li");
    // Click to navigate
    fireEvent.click(scoresLink);

    // Wait for the navigation to be completed
    await waitFor(() => {
      // Check this element is selected or not
      expect(scoresLiEL).toHaveClass("ant-menu-item-selected");
    });
  });
});
