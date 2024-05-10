import { IUser } from "../../interfaces/user.interface";

const MockUser: IUser[] = [
  {
    Id: "1",
    FullName: "New Mr.A",
    Email: "mra@gmail.com",
    DOB: "22/03/2000",
    Address: "HCM",
    Gender: true,
    Phone: "0123456789",
    Username: "A",
    Role: "Admin",
    Status: "Active",
    ImageUrl: "",
    Password: "",
  },
  {
    Id: "2",
    FullName: "New Mr.A",
    Email: "mra@gmail.com",
    DOB: "22/03/2000",
    Address: "HCM",
    Gender: true,
    Phone: "0123456789",
    Username: "A",
    Role: "Trainer",
    Status: "Active",
    ImageUrl: "",
    Password: "",
  },
];

export default MockUser;
