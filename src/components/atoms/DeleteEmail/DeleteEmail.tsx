import React from "react";
import { useSingleEmailStore } from "../../../store/EmailStore";
import DisableModal from "../DisableModal/DisableModal";

interface DisableEmailProps {
  id: string;
  handleDataChange: () => void;
}
const DeleteEmail: React.FC<DisableEmailProps> = ({ id, handleDataChange }) => {
  const { deleteSingleEmail } = useSingleEmailStore();

  const handleOk = () => {
    deleteSingleEmail(id);
    handleDataChange();
  };

  return (
    <DisableModal
      modalTitle="Delete this email template"
      handleOk={handleOk}
      buttonText="Delete"
    />
  );
};

export default DeleteEmail;
