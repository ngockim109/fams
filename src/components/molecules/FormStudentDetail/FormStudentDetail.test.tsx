import { render, screen } from "@testing-library/react";
import FormStudentDetail from "./FormStudentDetail";
import { IStudentClass } from "../../../interfaces/student-class.interface";
import { IModuleAssignmentScore } from "../../../interfaces/module-assignment-score.interface";

describe("FormStudentDetail Component", () => {
  const studentDetail: Partial<IStudentClass> = {
    Id: "1",
    StudentId: "123",
    FullName: "John Doe",
    Gender: true,
    DOB: "1990-01-01",
    Status: "Active",
    Phone: "1234567890",
    Email: "john.doe@example.com",
    Area: "Area",
    Address: "Address",
    University: "University",
    Major: "Major",
    GPA: 3.5,
    AvatarUrl: "https://example.com/avatar.jpg",
    AttendingStatus: "In class",
  };

  const studentScore: IModuleAssignmentScore[] = [
    {
      StudentName: "John Doe",
      Email: "john.doe@example.com",
      ModuleLevel: "Beginner",
      ModuleName: "Module A",
      ModuleType: "Type A",
      AssignmentScore: [
        {
          AssignmentName: "Assignment 1",
          ScoreValue: 80,
        },
        {
          AssignmentName: "Assignment 2",
          ScoreValue: 75,
        },
      ],
    },
  ];

  test("renders FormStudentDetail with student detail and score", () => {
    render(
      <FormStudentDetail
        studentDetail={studentDetail as IStudentClass}
        studentScore={studentScore}
        className="React04"
        classId="01"
        studentId="21"
      />
    );
  });

  test("renders tabs with correct labels and content", () => {
    render(
      <FormStudentDetail
        studentDetail={studentDetail as IStudentClass}
        studentScore={studentScore}
        className="React04"
        classId="01"
        studentId="21"
      />
    );

    expect(screen.getByText("General Information")).toBeInTheDocument();
    expect(screen.getByText("Academic Info")).toBeInTheDocument();
  });
});
