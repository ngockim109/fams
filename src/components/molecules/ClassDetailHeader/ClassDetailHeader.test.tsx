/* eslint-disable no-proto */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ClassDetailHeader from "./ClassDetailHeader";
import MockClass from "../../../test-data/Classes/MockClass";

describe("ClassDetailHeader component", () => {
  const hideSendEmail = false;
  beforeEach(() => {
    // Mock localStorage.getItem() to return a valid JSON string
    vi.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue(
      JSON.stringify({})
    );
  });

  test("renders class details correctly", () => {
    render(
      <MemoryRouter>
        <ClassDetailHeader
          classDetail={MockClass[0]}
          hideSendEmail={hideSendEmail}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(MockClass[0].ClassName)).toBeInTheDocument();
    expect(screen.getByText(MockClass[0].StatusClass)).toBeInTheDocument();
    expect(screen.getByText(MockClass[0].Id)).toBeInTheDocument();
    expect(screen.getByText(MockClass[0].StartDate)).toBeInTheDocument();
    expect(screen.getByText(MockClass[0].EndDate)).toBeInTheDocument();
  });

  test("renders send email button when hideSendEmail is false", () => {
    render(
      <MemoryRouter>
        <ClassDetailHeader
          classDetail={MockClass[0]}
          hideSendEmail={hideSendEmail}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Send email")).toBeInTheDocument();
  });

  test("does not render send email button when hideSendEmail is true", () => {
    render(
      <MemoryRouter>
        <ClassDetailHeader classDetail={MockClass[0]} hideSendEmail />
      </MemoryRouter>
    );

    expect(screen.queryByText("Send email")).not.toBeInTheDocument();
  });
});
