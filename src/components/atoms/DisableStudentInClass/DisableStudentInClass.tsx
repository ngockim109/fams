import React from "react";
import DisableModal from "../DisableModal/DisableModal";
import { useSingleStudentClassStore } from "../../../store/StudentClassStore";

interface DisableStudentInClassrops {
  id: string;
  classId: string;
  handleDataChange: () => void;
}
const DisableStudentInClass: React.FC<DisableStudentInClassrops> = ({
  id,
  classId,
  handleDataChange,
}) => {
  const { deleteSingleStudentInClass } = useSingleStudentClassStore();

  const handleOk = () => {
    handleDataChange();
    deleteSingleStudentInClass(id, classId);
  };

  return (
    <DisableModal
      buttonText="Delete"
      handleOk={handleOk}
      modalTitle="Delete Student In Class"
    />
  );
};

export default DisableStudentInClass;
