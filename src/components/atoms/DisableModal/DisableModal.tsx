import React, { useState } from "react";
import { Modal } from "antd";
import { IoIosWarning } from "react-icons/io";
import "./DisableModal.scss";
import Colors from "../../../constants/Colors";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import { DefaultDeleteButton } from "../CustomButton/CustomButton";

interface DisableStudentProps {
  handleOk: () => void;
  modalTitle: string;
  buttonText: string;
}
const DisableModal: React.FC<DisableStudentProps> = ({
  handleOk,
  modalTitle,
  buttonText,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DefaultDeleteButton text={buttonText} onClick={showModal} />
      <Modal
        title={
          <div className="title-header">
            <IoIosWarning color={Colors.LightRed} />
            <span>{modalTitle}</span>
          </div>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        open={isModalOpen}
        centered
        className="disable-modal"
        data-testid="delete-email-form"
        footer={
          <FormFooter
            text={buttonText}
            handleCancel={handleCancel}
            handleOk={() => {
              handleOk();
              handleCancel();
            }}
          />
        }
      >
        <span>Are you sure to {modalTitle.toLowerCase()}?</span>
      </Modal>
    </>
  );
};

export default DisableModal;
