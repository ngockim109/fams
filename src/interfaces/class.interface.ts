export interface ITrainer {
  Email: string;
  FullName: string;
  Phone: string;
  UserID: string;
}
export interface IClass {
  Id: string;
  ClassName: string;
  StartDate: string;
  EndDate: string;
  CreatedDate: string;
  CreatedBy: string;
  UpdatedDate: string;
  UpdatedBy: string;
  Duration: number;
  Location: string;
  StatusClass: string;
  Trainer: ITrainer;
  Fsu: string;
  SpecificLocation: string;
  Reviewer: string;
  Approver: string;
  ReviewDate: string;
  ApproveDate: string;
}
