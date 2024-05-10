import { IReservingCondition } from "./reserving-condition.interface";

export interface IStudentClassStatus {
  ClassId: string;
  StudentId: string;
  CurrentStatus: string;
  NewStatus: string;
  Reason: string;
  Conditions: IReservingCondition[];
}
