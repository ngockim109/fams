import React from "react";
import { useSingleStudentStore } from "../../../store/StudentStore";
import DisableModal from "../../atoms/DisableModal/DisableModal";

interface DisableStudentProps {
  id: string;
  handleDataChange: () => void;
}
const DisableStudent: React.FC<DisableStudentProps> = ({
  id,
  handleDataChange,
}) => {
  const { deleteSingleStudent } = useSingleStudentStore();

  const handleOk = () => {
    deleteSingleStudent(id);
    handleDataChange();
  };

  return (
    <DisableModal
      modalTitle="Delete student"
      handleOk={handleOk}
      buttonText="Delete"
    />
  );
};

export default DisableStudent;
