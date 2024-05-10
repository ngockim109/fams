enum RouterEndpoints {
  // COMMON ROUTES
  Home = "/home",
  Login = "/login",
  Dashboard = "/dashboard",
  Profile = "/profile",

  // USERS MANAGEMENT
  UsersManagement = "/users",
  UserDetail = "/users/:id",
  UserDetailGeneral = "/users/",
  AddUser = "/users/add",
  EditUser = "/users/edit",
  UserPermission = "/users/permission",

  // STUDENTS ROUTES
  StudentsManagement = "/students",
  AttendeeDetail = "/students/:id",
  StudentDetail = "/classes/:classId/student-management/:studentId",
  AddStudent = "/students/add",
  EditStudent = "/students/edit/:id",

  // RESERVED STUDENTS ROUTES
  ReservedStudents = "/reserved-students",

  // CLASSES MANAGEMENT
  ClassesManagement = "/classes",
  ClassDetail = "/classes/:id",

  // SCORES ROUTES
  ScoreDetail = "/classes/:id/scores/:id",
  AddScore = "/classes/:id/scores/add",
  EditScore = "/classes/:classId/scores/edit/:studentId",

  // EMAILS ROUTES
  EmailsManagement = "/emails",
  EmailTemplate = "/email-template",
  EmailDetail = "/emails/:id",
  AddEmail = "/emails/add",
  EditEmail = "/emails/edit/:id",
}

export default RouterEndpoints;
