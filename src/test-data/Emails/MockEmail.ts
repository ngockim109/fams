import { IActivityLog } from "../../interfaces/activity-log.interface";

const MockEmail: IActivityLog[] = [
  {
    Id: "1njjh37882910",
    SendDate: "10/10/2002",
    ReceiverType: "Score",
    Receiver: "Nguyễn Tường Vy",
    EmailTemplateId: "2",
    SenderId: "1276876",
    EmailType: "Score",
    EmailTemplateName: "Score Management",
    CC: ["nguyentuongvy@gmail.com"],
    To: ["nguyenvana@gmail.com"],
    UserEmail: ["admin@gmail.com"],
    StudentId: "SI234567",
    ClassId: "HCM24_01",
    TemplateId: "3",
  },
];

export default MockEmail;
