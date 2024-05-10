import { IModuleAssignmentScore } from "./module-assignment-score.interface";

export interface IStudentScore {
  ClassId: string;
  StudentId: string;
  Scores: IModuleAssignmentScore[];
}
