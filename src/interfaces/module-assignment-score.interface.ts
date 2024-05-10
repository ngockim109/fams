import { IAssignmentScore } from "./assignment-score.interface";

export interface IModuleAssignmentScore {
  StudentName?: string;
  Email?: string;
  ModuleLevel?: string;
  ModuleName: string;
  ModuleType: string;
  AssignmentScore: IAssignmentScore[];
}
