export interface IActivityLog {
  Id: string;
  SendDate: string;
  ReceiverType: string;
  Receiver: string;
  EmailTemplateId: string;
  SenderId: string;
  EmailType: string;
  EmailTemplateName: string;
  CC: string[];
  To: string[];
  UserEmail: string[];
  StudentId: string;
  ClassId: string;
  TemplateId: string;
}
