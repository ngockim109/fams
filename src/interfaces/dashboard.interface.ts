export interface YearData {
  Year: number;
  SemesterData: Array<SemesterData>;
}
export interface SemesterData {
  Quantity: number;
  Time: string;
}
export interface Person {
  ID: string;
  Name: string;
  GPA: number;
}
export interface YearDataWithStudent {
  Year: number;
  SemesterData: Array<SemesterIncludeStudent>;
}
export interface SemesterIncludeStudent {
  Data: Array<Person>;
  Time: string;
}
export interface IDashboard {
  ID: string;
  TotalUser: number;
  TotalStudent: number;
  TotalStudentReserve: number;
  TotalStudentMale: number;
  TotalStudentDropOut: number;
  TotalStudentFinished: number;
  TotalClass: number;
  TotalStudentPass: number;
  TotalStudentFail: number;
  GraduatedStudents: Array<YearData>;
  IncomingStudents: Array<YearData>;
  StudentRanking: Array<YearDataWithStudent>;
  TotalEmailTemplate: number;
  TotalEmailReserve: number;
  TotalEmailRemind: number;
  TotalEmailNotice: number;
  TotalEmailScore: number;
}
export interface PieChartDataProps {
  name: string;
  value: number;
}
