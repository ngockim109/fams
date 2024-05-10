/* This describe block is use test for header component 
 - test image of logo and oranization use is correctly
 - test avatar user have been shown o page
*/

import { screen, render } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import Header from "./Header";

describe("Header Component", () => {
  test("should render correctly images branch logo  ", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    // Find logo image
    const logoElement = await screen.findByAltText("@logo");
    // Test src of image is correctly
    expect(logoElement).toHaveAttribute("src", "/assets/images/logo.png");
  });

  test("should render correctly organization  ", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    // Find logo oranization
    const oranizationImgElement = await screen.findByAltText("@organization");
    // Test src of oranization is correctly
    expect(oranizationImgElement).toHaveAttribute(
      "src",
      "/assets/images/organization.png"
    );
    // Test content is containing "uniGate"
    const textContent = await screen.findByText("uniGate");

    expect(textContent).toBeInTheDocument();
  });
});
