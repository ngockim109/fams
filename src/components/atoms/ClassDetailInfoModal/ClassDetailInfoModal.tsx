import React from "react";
import { Card } from "antd";
import Colors from "../../../constants/Colors";
import "./ClassDetailInfoModal.scss";
import StatusTag from "../StatusTag/StatusTag";
import Badge from "../Badge/Badge";
import { IClass } from "../../../interfaces/class.interface";
import { IClassStudent } from "../../../interfaces/class-student.interface";
import { handleFirstLetterUpperCaseAndBackspace } from "../../../utils/HandleDataShown";

interface ClassDetailInfoModalProps {
  studentClass?: IClassStudent;
  classDetail?: IClass;
}

const ClassDetailInfoModal: React.FC<ClassDetailInfoModalProps> = ({
  studentClass,
  classDetail,
}) => {
  let backgroundColor = "";

  switch (studentClass?.StatusClass ?? classDetail?.StatusClass) {
    case "Opening":
      backgroundColor = Colors.LightGreen;
      break;

    case "Planning":
      backgroundColor = Colors.LightDark;
      break;

    case "Scheduled":
      backgroundColor = Colors.Yellow;
      break;

    case "Completed":
      backgroundColor = Colors.Red;
      break;

    case "Closed":
      backgroundColor = Colors.LightOrange;
      break;

    default:
      backgroundColor = Colors.White;
      break;
  }
  return (
    <Card className="class-info-modal">
      {!classDetail?.StatusClass && (
        <Badge
          color={backgroundColor}
          tooltip={studentClass?.StatusClass ?? classDetail?.StatusClass ?? ""}
        />
      )}
      <div className="first-line">
        <div className="subtitle2-bold ">
          {studentClass?.ClassName ?? classDetail?.ClassName}
        </div>
        <div className="class-status">
          <StatusTag
            status={handleFirstLetterUpperCaseAndBackspace(
              studentClass?.AttendingStatus ?? classDetail?.StatusClass ?? ""
            )}
            content={handleFirstLetterUpperCaseAndBackspace(
              studentClass?.AttendingStatus ?? classDetail?.StatusClass ?? ""
            )}
          />
        </div>
      </div>
      <div className="second-line">
        <div className="class">{studentClass?.ClassId ?? classDetail?.Id}</div>
        <div className="st">
          {studentClass?.StartDate ?? classDetail?.StartDate}
        </div>
        <div className="end">
          {studentClass?.EndDate ?? classDetail?.EndDate}
        </div>
      </div>
    </Card>
  );
};

ClassDetailInfoModal.defaultProps = {
  classDetail: {} as IClass,
  studentClass: {} as IClassStudent,
};
export default ClassDetailInfoModal;
