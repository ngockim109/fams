import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ClassesManagement from "./ClassesManagement";

describe("ClassesManagement Component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <ClassesManagement />
      </BrowserRouter>
    );
  });
});
