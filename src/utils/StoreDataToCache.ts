import { IEmail } from "../interfaces/email.interface";
import { IReservedStudent } from "../interfaces/reserved-student.interface";
import { IScore } from "../interfaces/score.interface";
import { IStudentClass } from "../interfaces/student-class.interface";
import { IStudent } from "../interfaces/student.interface";
import { IUser } from "../interfaces/user.interface";

export const storeDataToCache = (
  data:
    | IStudent[]
    | IScore[]
    | IReservedStudent[]
    | IEmail[]
    | IUser[]
    | IStudentClass[],
  name: string
) => {
  try {
    sessionStorage.setItem(name, JSON.stringify(data));
    return 1;
  } catch (error) {
    return 0;
  }
};

export const getDataFromCache = (
  name: string
):
  | IStudent[]
  | IScore[]
  | IReservedStudent[]
  | IEmail[]
  | IUser[]
  | IStudentClass[] => {
  const dataCache = sessionStorage.getItem(name);
  const parseData = dataCache ? JSON.parse(dataCache) : null;
  return parseData;
};
