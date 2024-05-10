// URLS
export const BASE_URL = "https://korroo.ddns.net/api/";
export const BASE_URL_DASHBOARD =
  "https://6602720e9d7276a755533e22.mockapi.io/";
export const BASE_URL_MODULE_SCORE =
  "https://65d94053c96fbb24c1bcd60a.mockapi.io/api/v1/";
export const PROVINCE_URL = "https://65451fd55a0b4b04436dad71.mockapi.io/";
export const BASE_URL_MOCK_SCORE =
  "https://65ba770db4d53c066552fa4e.mockapi.io/api/v1/";

// ENDPOINTS
export enum Endpoints {
  Login = "auth/login/",
  Logout = "auth/logout/",
  Student = "students/",
  ReservedStudentInformation = "reserved-class/management-reserveClass/",
  ReservedStudent = "reserved-class/",
  Score = "scores/",
  ScoreInClass = "scores/score-list?classId=",
  ScoreAllClass = "/scores/score-all-class?studentId=",
  ScoreOfStudentInClass = "scores/student-score?",
  StudentInClass = "students/student-management/",
  StudentDetailInClass = "student-class/studentclass-id?",
  StudentToClass = "student-class",
  StudentClassStatus = "student-class/status",
  StudentListInClass = "student-class?ClassID=",
  User = "users/",
  UserSearch = "users?searchFullName=",
  Email = "emails/",
  EmailSendToClass = "emails/send-email-to-class",
  EmailTemplate = "email-template",
  Class = "class/",
  ModuleScore = "module-scores/",
  Province = "provinces/",
  ReservingCondition = "reserving-conditions",
  ReservingReason = "reserving-reasons",
  StudentSearch = "students?searchterm=",
  ReservedStudentSearch = "reserved-class?searchterm=",
  StudentImport = "students/import-file-student",
  StudentScoreImport = "scores/import-file-score?classId=",
  StudentClassImport = "student-class/import-file-student-in-class",
  UserImport = "users/import-file-user?SenderId=",
}
