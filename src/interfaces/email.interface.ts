export interface IEmail {
  Id: string;
  Name: string;
  Description: string;
  ApplyTo: string;
  Type: string;
  Status: string;
  Subject: string;
  CreatedBy: string;
  CreatedDate: string;
  UpdatedBy: string;
  UpdatedDate: string;
  Sender: string;
  Receiver: string;
  UserId: string;
  Cc: string;
  DearName: boolean;
  Content: string;
  ModuleScore: Array<string>;
}
