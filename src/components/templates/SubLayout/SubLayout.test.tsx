import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SubLayout from "./SubLayout";

describe("SubLayout Component", () => {
  test("renders header, outlet, and footer", () => {
    render(
      <MemoryRouter>
        <SubLayout />
      </MemoryRouter>
    );
  });
});
