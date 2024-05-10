import { IModuleAssignmentScore } from "./module-assignment-score.interface";

export interface IScore {
  StudentId: string;
  Scores: IModuleAssignmentScore[];
  GPA: number;
}
