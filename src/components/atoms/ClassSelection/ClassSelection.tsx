import { Button } from "antd";
import React from "react";
import ClassDetailInfoModal from "../ClassDetailInfoModal/ClassDetailInfoModal";
import { IClassStudent } from "../../../interfaces/class-student.interface";
import "./ClassSelection.scss";

interface ClassSelectionProps {
  classDetail: IClassStudent;
  handleChooseClass: (classId: string, classDetail: string) => void;
  isSelected: boolean;
}

const ClassSelection: React.FC<ClassSelectionProps> = ({
  classDetail,
  handleChooseClass,
  isSelected,
}) => (
  <Button
    onClick={() =>
      handleChooseClass(classDetail?.ClassId, classDetail?.AttendingStatus)
    }
    className={`class-selection-container ${isSelected ? "selected-class" : ""}`}
  >
    <ClassDetailInfoModal studentClass={classDetail} />
  </Button>
);

export default ClassSelection;
