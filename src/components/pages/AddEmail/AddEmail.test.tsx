/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddEmail from "./AddEmail";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
(global as any).localStorage = localStorageMock;
describe("AddEmail Component", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
  });
  test("renders without crashing", () => {
    // Mocking the user info stored in localStorage
    const userInfo = {};
    localStorageMock.getItem.mockReturnValue(JSON.stringify(userInfo));
    render(
      <BrowserRouter>
        <AddEmail />
      </BrowserRouter>
    );
  });
});
