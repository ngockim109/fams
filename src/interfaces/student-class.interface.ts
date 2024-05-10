export interface IStudentClass {
  Id: string;
  StudentId: string;
  FullName: string;
  Phone: string;
  Email: string;
  Status: string;
  Gender: boolean;
  DOB: string;
  GPA: number;
  AttendingStatus: string;
  Result: string;
  FinalScore: number;
  GPALevel: string;
  CertificationStatus: string;
  CertificationDate: string;
  Method: number;
  Address: string;
  Area: string;
  University: string;
  Major: string;
  AvatarUrl: string;
  FAAccount: string;
  ClassId: string;
}

export interface IPartStudentClass {
  FinalScore: number;
  CertificationStatus: string;
  CertificationDate: string;
  Method: number;
}
