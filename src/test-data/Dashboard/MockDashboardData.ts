import { IDashboard } from "../../interfaces/dashboard.interface";

const MockDashboardData: IDashboard[] = [
  {
    ID: "dashboard-id",
    TotalUser: 100,
    TotalStudent: 50,
    TotalStudentReserve: 20,
    TotalStudentMale: 30,
    TotalStudentDropOut: 10,
    TotalStudentFinished: 40,
    TotalClass: 5,
    TotalStudentPass: 35,
    TotalStudentFail: 15,
    GraduatedStudents: [
      {
        Year: 2021,
        SemesterData: [
          { Time: "Spring", Quantity: 50 },
          { Time: "Fall", Quantity: 80 },
        ],
      },
      {
        Year: 2022,
        SemesterData: [
          { Time: "Spring", Quantity: 60 },
          { Time: "Fall", Quantity: 90 },
        ],
      },
    ],
    IncomingStudents: [
      {
        Year: 2021,
        SemesterData: [
          { Time: "Spring", Quantity: 100 },
          { Time: "Fall", Quantity: 200 },
        ],
      },
      {
        Year: 2022,
        SemesterData: [
          { Time: "Spring", Quantity: 150 },
          { Time: "Fall", Quantity: 250 },
        ],
      },
    ],
    StudentRanking: [
      {
        Year: 2022,
        SemesterData: [
          {
            Time: "Semester 1",
            Data: [
              { ID: "1", Name: "John", GPA: 3.8 },
              { ID: "2", Name: "Alice", GPA: 3.7 },
              { ID: "3", Name: "Bob", GPA: 3.6 },
            ],
          },
        ],
      },
    ],
    TotalEmailTemplate: 10,
    TotalEmailReserve: 5,
    TotalEmailRemind: 2,
    TotalEmailNotice: 3,
    TotalEmailScore: 10,
  },
];
export default MockDashboardData;
