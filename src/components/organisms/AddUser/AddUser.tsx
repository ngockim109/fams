/** This function component is Modal contain Form with response for add information for user
 * Usage:
 * <AddUser/>
 */
import { Modal } from "antd";
import React, { useState } from "react";
import { VscError } from "react-icons/vsc";
import { AddButton } from "../../atoms/CustomButton/CustomButton";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import Sizes from "../../../constants/Sizes";
import Colors from "../../../constants/Colors";
import { useSingleUserStore } from "../../../store/UserStore";
import { IUser } from "../../../interfaces/user.interface";
import UserForm from "../../molecules/UserForm/UserForm";
import formatDate from "../../../utils/DateFormatting";

interface AddUserProps {
  handleDataChange: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ handleDataChange }) => {
  // USE STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // USE STORES
  const { postSingleUser } = useSingleUserStore();

  const initialValues: IUser = {
    Id: "",
    FullName: "",
    Gender: true,
    Email: "",
    DOB: "",
    Phone: "",
    Status: "Active",
    Role: "Trainer",
    ImageUrl: "",
    Address: "",
    Username: "",
    Password: "",
  };

  // Functions handles modals and form reset fields
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleDataChange();
    setIsReset(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsReset(true);
  };

  // Function handles form submit, get value and send this to api,
  // then reset form fields and close modal
  const onFinish = (values: IUser) => {
    const userData: IUser = {
      Id: "",
      FullName: values.FullName,
      Gender: values.Gender,
      Email: values.Email,
      DOB: formatDate(values.DOB),
      Phone: values.Phone,
      Status: values.Status,
      Role: values.Role,
      Address: values.Address,
      Username: values.Username,
      ImageUrl: values.ImageUrl,
      Password: values.Password,
    };
    postSingleUser(userData);
    handleOk();
  };

  return (
    <>
      <AddButton onClick={showModal} text="Add User" />
      {/* This Modal contain Form which handle add new user */}
      <Modal
        title={
          <div className="modal-header-custom centered">Add a new user</div>
        }
        forceRender
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        okText="Submit"
        cancelText="Cancel"
        footer={
          <div className="centered">
            <FormFooter
              handleCancel={handleCancel}
              formName="AddUser"
              text="Create"
            />
          </div>
        }
        className="add-reserving-modal"
        width="50%"
        closeIcon={<VscError size={Sizes.LgMedium} color={Colors.White} />}
      >
        <div className="model-reserve-content">
          <div className="reserving modal-content-custom">
            <UserForm
              setIsReset={setIsReset}
              isReset={isReset}
              onFinish={onFinish}
              initialValues={initialValues}
              formName="AddUser"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddUser;
