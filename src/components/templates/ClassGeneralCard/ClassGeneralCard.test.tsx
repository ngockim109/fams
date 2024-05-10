import { render, screen } from "@testing-library/react";
import ClassGeneralCard from "./ClassGeneralCard";
import MockClass from "../../../test-data/Classes/MockClass";

describe("ClassGeneralCard Component", () => {
  const mockClassInfo = MockClass[0];

  test("renders class general card with correct information", () => {
    render(<ClassGeneralCard classInfo={mockClassInfo} />);

    // Check if class general card title is rendered
    const titleText = screen.getByText("General");
    expect(titleText).toBeInTheDocument();

    // Check if class time is rendered
    const classTime = screen.getByText("08:30 - 09:00");
    expect(classTime).toBeInTheDocument();
  });

  test("collapsible panel opens by default", () => {
    render(<ClassGeneralCard classInfo={mockClassInfo} />);

    // Check if collapsible panel is open by default
    const classTime = screen.getByText("08:30 - 09:00");
    expect(classTime).toBeInTheDocument();
  });
});
