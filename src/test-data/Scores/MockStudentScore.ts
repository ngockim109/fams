import { IModuleAssignmentScore } from "../../interfaces/module-assignment-score.interface";

const MockStudentScore: IModuleAssignmentScore[] = [
  {
    StudentName: "Trương Tuấn Anh",
    Email: "anhttse161158@fpt.edu.vn",
    ModuleLevel: "mặc định",
    ModuleName: "Quiz",
    ModuleType: "1",
    AssignmentScore: [
      {
        AssignmentName: "Quiz 1",
        ScoreValue: 9,
      },
      {
        AssignmentName: "Quiz 2",
        ScoreValue: 1,
      },
      {
        AssignmentName: "Quiz 3",
        ScoreValue: 7,
      },
      {
        AssignmentName: "Quiz 4",
        ScoreValue: -1,
      },
      {
        AssignmentName: "Quiz 5",
        ScoreValue: -1,
      },
      {
        AssignmentName: "Quiz Avg",
        ScoreValue: -1,
      },
    ],
  },
  {
    StudentName: "Trương Tuấn Anh",
    Email: "anhttse161158@fpt.edu.vn",
    ModuleLevel: "mặc định",
    ModuleName: "Quiz",
    ModuleType: "1",
    AssignmentScore: [
      {
        AssignmentName: "Quiz 1",
        ScoreValue: -1,
      },
      {
        AssignmentName: "Quiz 2",
        ScoreValue: -1,
      },
      {
        AssignmentName: "Quiz 3",
        ScoreValue: -1,
      },
      {
        AssignmentName: "Quiz 4",
        ScoreValue: -1,
      },
      {
        AssignmentName: "Quiz 5",
        ScoreValue: -1,
      },
      {
        AssignmentName: "Quiz Avg",
        ScoreValue: -1,
      },
    ],
  },
];
export default MockStudentScore;
