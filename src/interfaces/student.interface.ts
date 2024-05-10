import { IClassStudent } from "./class-student.interface";

export interface IStudent {
  StudentId: string;
  FullName: string;
  Gender: boolean;
  DOB: string;
  Status: string;
  Phone: string;
  Email: string;
  Area: string;
  Address: string;
  University: string;
  Major: string;
  GPA: number;
  GraduatedDate: string;
  ClassStartDate: string;
  AvatarUrl: string;
  Class: string;
  Classes: IClassStudent[];
  FAAccount: string;
  JoinedDate: string;
}
