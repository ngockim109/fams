import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CustomBreadcrumb from "./CustomBreadcrumb";

test("renders correct breadcrumbs based on location", () => {
  // Mocking location.pathname
  const mockLocation = { pathname: "/dashboard/classes" };

  // Render CustomBreadcrumb with MemoryRouter and mock location
  render(
    <MemoryRouter initialEntries={[mockLocation]}>
      <CustomBreadcrumb />
    </MemoryRouter>
  );

  // Assert that correct breadcrumbs are rendered
  const breadcrumbs = screen.getAllByRole("link");
  expect(breadcrumbs).toHaveLength(3); // Home, Dashboard, Classes
  expect(breadcrumbs[0]).toHaveTextContent("Home");
  expect(breadcrumbs[1]).toHaveTextContent("Dashboard");
  expect(breadcrumbs[2]).toHaveTextContent("Classes");
});
