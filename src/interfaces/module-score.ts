interface IModuleGroup {
  AssignmentName: string;
}

export interface IModuleScore {
  ID: string;
  AssignmentNameGroup: IModuleGroup[];
  ModuleName: string;
}
