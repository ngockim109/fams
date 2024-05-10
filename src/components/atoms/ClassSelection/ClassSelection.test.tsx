import { render, fireEvent, screen } from "@testing-library/react";
import ClassSelection from "./ClassSelection";

const mockClassDetail = {
  ClassId: "HCM24_01",
  ClassName: "Sample Class",
  StartDate: "2024-04-01",
  EndDate: "2024-04-30",
  Location: "Sample Location",
  Duration: 30,
  StatusClass: "Sample Status",
  AttendingStatus: "Attending",
};

describe("ClassSelection component", () => {
  it("renders class selection button", () => {
    const handleChooseClass = () => {};
    render(
      <ClassSelection
        isSelected
        classDetail={mockClassDetail}
        handleChooseClass={handleChooseClass}
      />
    );
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();

    fireEvent.click(button);
  });
});
