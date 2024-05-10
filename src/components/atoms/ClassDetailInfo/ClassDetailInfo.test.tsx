/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ClassDetailInfo from "./ClassDetailInfo";
import MockClass from "../../../test-data/Classes/MockClass";

// Mocking localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
(global as any).localStorage = localStorageMock;

describe("ClassDetailInfo component", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
  });

  test("should render class details and tabs", () => {
    // Mocking the user info stored in localStorage
    const userInfo = {};
    localStorageMock.getItem.mockReturnValue(JSON.stringify(userInfo));

    render(
      <MemoryRouter>
        <ClassDetailInfo classDetail={MockClass[0]} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("class-detail-info")).toBeInTheDocument();
    expect(screen.getByText(MockClass[0].ClassName)).toBeInTheDocument();

    expect(screen.getByTestId("class-tabs")).toBeInTheDocument();
    expect(screen.getByText("Students In Class")).toBeInTheDocument();
    expect(screen.getByText("Students Scores")).toBeInTheDocument();
  });
});
