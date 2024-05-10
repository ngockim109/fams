import React from "react";
import { useSingleUserStore } from "../../../store/UserStore";
import DisableModal from "../DisableModal/DisableModal";

interface DisableStudentProps {
  id: string;
  handleDataChange: () => void;
}
const DisableUser: React.FC<DisableStudentProps> = ({
  id,
  handleDataChange,
}) => {
  const { putSingleUser } = useSingleUserStore();
  const data = [{ path: `/Status`, value: "Inactive", op: "replace" }];
  const handleOk = () => {
    putSingleUser(data, id);
    handleDataChange();
  };

  return (
    <DisableModal
      buttonText="Disable"
      handleOk={handleOk}
      modalTitle="Disable user"
    />
  );
};

export default DisableUser;
