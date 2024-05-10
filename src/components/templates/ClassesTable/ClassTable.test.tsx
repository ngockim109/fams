/* eslint-disable array-callback-return */
import { render, screen } from "@testing-library/react";
import MockClass from "../../../test-data/Classes/MockClass";
import ClassTable from "./ClassesTable";

describe("ClassTable Component", () => {
  const mockClasses = MockClass;

  test("renders class table with correct data", () => {
    render(<ClassTable classes={mockClasses} loading={false} />);

    expect(screen.getByText("Class ID")).toBeInTheDocument();
    expect(screen.getByText("Class Name")).toBeInTheDocument();
    expect(screen.getByText("Created on")).toBeInTheDocument();
    expect(screen.getByText("Created by")).toBeInTheDocument();
    expect(screen.getByText("Duration")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    mockClasses?.map((classDetail) => {
      expect(screen.getByText(classDetail?.Id)).toBeInTheDocument();
    });
  });
});
