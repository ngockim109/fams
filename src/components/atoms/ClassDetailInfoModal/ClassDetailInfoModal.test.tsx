import { render, screen } from "@testing-library/react";
import ClassDetailInfoModal from "./ClassDetailInfoModal";
import { IClassStudent } from "../../../interfaces/class-student.interface";

describe("ClassDetailInfoModal Component", () => {
  const mockClassDetail: IClassStudent = {
    ClassId: "1",
    ClassName: "Fresher Developer Legacy Security Developer",
    StartDate: "01/03/2023",
    EndDate: "10/04/2023",
    Location: "Hồ Chí Minh",
    Duration: 41,
    StatusClass: "Closed",
    AttendingStatus: "Attending",
  };

  test("renders class detail information correctly in modal", () => {
    render(<ClassDetailInfoModal studentClass={mockClassDetail} />);

    // Check if class name, class ID, start date, end date, and class status are rendered
    const classNameElement = screen.getByText(mockClassDetail.ClassName);
    const classIDElement = screen.getByText(mockClassDetail.ClassId);
    const startDateElement = screen.getByText(mockClassDetail.StartDate);
    const endDateElement = screen.getByText(mockClassDetail.EndDate);

    expect(classNameElement).toBeInTheDocument();
    expect(classIDElement).toBeInTheDocument();
    expect(startDateElement).toBeInTheDocument();
    expect(endDateElement).toBeInTheDocument();
  });
});
