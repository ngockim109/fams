/** This function component is Form in Modal with response for add reserving information for
 * student, it accept props is id of student, if id is passed, it will auto generate StudentID,
 * ClassName, ClassCode, Current Modules; else if id is an empty string, it will show a search
 * input that allows user find student information by student ID. If student ID exists, it will
 * auto generate the ClassName, ClassCode, Current Modules. Then user required to input the
 * reserved information including period of reservation, reason and conditions for reservation,
 * status active reservation and student information (StudentID, ClassName, ClassCode,
 * Current Modules). And post this to reserved-students api.
 * Usage:
 * <AddReservingStudent id={id}/> with id is optional
 */
import { Modal } from "antd";
import React, { useState } from "react";
import { VscError } from "react-icons/vsc";
import { AddButton } from "../../atoms/CustomButton/CustomButton";
import "./AddReservingStudent.scss";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import Sizes from "../../../constants/Sizes";
import AddReservingStudentForm from "../../molecules/AddReservingStudentForm/AddReservingStudentForm";
import Colors from "../../../constants/Colors";
import { IStudent } from "../../../interfaces/student.interface";

interface AddReservingStudentProps {
  id?: string;
  student?: IStudent | null;
  handleDataChange: () => void;
  isAddNew?: boolean;
}

const AddReservingStudent: React.FC<AddReservingStudentProps> = ({
  id,
  student,
  handleDataChange,
  isAddNew,
}) => {
  // USE STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Functions handles modals and form reset fields
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleDataChange();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsReset(true);
  };

  return (
    <>
      {/* If id is passed from parent component, it will show button Add reserving, 
      else show button Add New */}
      {id === "" ? (
        <AddButton onClick={showModal} text="Add new" />
      ) : (
        <AddButton onClick={showModal} text="Add reserving" />
      )}

      {/* This Modal contain Form which handle add reserving for student */}
      <Modal
        title={
          <div className="modal-header-custom centered">Reserving Details</div>
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
              formName="AddReserving"
              text="Create"
            />
          </div>
        }
        className="add-reserving-modal"
        width="50%"
        closeIcon={<VscError size={Sizes.LgMedium} color={Colors.White} />}
      >
        <div className="add-reserving-modal-content modal-content-custom">
          <AddReservingStudentForm
            id={id}
            student={student}
            handleOk={handleOk}
            isAddNew={isAddNew}
            isReset={isReset}
            setIsReset={setIsReset}
          />
        </div>
      </Modal>
    </>
  );
};

AddReservingStudent.defaultProps = {
  id: "",
  isAddNew: true,
  student: null,
};
export default AddReservingStudent;
