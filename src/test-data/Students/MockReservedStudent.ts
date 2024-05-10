import { IReservedStudent } from "../../interfaces/reserved-student.interface";

const MockReservedStudent: IReservedStudent[] = [
  {
    FullName: "Phan Hiếu Nghĩa",
    Gender: true,
    DOB: "28/02/2000",
    University: "HCM",
    Address: "155 Nguyễn Huệ",
    Area: "City A",
    Reason: "Reservation",
    StartDate: "10/04/2024",
    EndDate: "10/10/2024",
    StudentId: "SE240002",
    ClassId: "HCM24_JAVA_05",
    ClassName: "JAVA",
    Conditions: [
      {
        Name: "Complete tuition payment",
        Id: "1",
      },
      {
        Name: "Ensure the course has not progressed beyond 50%",
        Id: "2",
      },
    ],
    Status: "Reserve",
    Email: "nghiaphan2808@gmail.com",
    CurrentStatus: "",
    NewStatus: "",
  },
  {
    FullName: "Phan Hiếu Nghĩa",
    Gender: true,
    DOB: "28/02/2000",
    University: "HCM",
    Address: "155 Nguyễn Huệ",
    Area: "City A",
    Reason: "Reservation",
    StartDate: "10/04/2024",
    EndDate: "10/10/2024",
    StudentId: "SE240002",
    ClassId: "HCM24_JAVA_04",
    ClassName: "JAVA",
    Conditions: [
      {
        Name: "Complete tuition payment",
        Id: "1",
      },
      {
        Name: "Ensure the course has not progressed beyond 50%",
        Id: "2",
      },
    ],
    Status: "Reserve",
    Email: "nghiaphan2808@gmail.com",
    CurrentStatus: "",
    NewStatus: "",
  },
];

export default MockReservedStudent;
