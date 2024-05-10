import { IReservingCondition } from "./reserving-condition.interface";

export interface IReservedStudent {
  FullName: string;
  Gender: boolean;
  DOB: string;
  University: string;
  Address: string;
  Area: string;
  StartDate: string;
  EndDate: string;
  ClassName: string;
  Status: string;
  ClassId: string;
  StudentId: string;
  CurrentStatus: string;
  NewStatus: string;
  Reason: string;
  Conditions: IReservingCondition[];
  Email: string;
}
