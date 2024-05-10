// StudentForm component that is used for Add student and Edit student information.tsx
import React from "react";
import { Empty, Form } from "antd";
import { useNavigate } from "react-router-dom";
import GeneralInfo from "../../atoms/GeneralInfo/GeneralInfo";
import OtherInfo from "../../atoms/OtherInfo/OtherInfo";
import "./StudentForm.scss";
import { IStudent } from "../../../interfaces/student.interface";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import AddReservingStudent from "../../organisms/AddReservingStudent/AddReservingStudent";
import { useReservedStudentStore } from "../../../store/ReservedStudentStore";
import AddClassToStudent from "../../atoms/AddClassToStudent/AddClassToStudent";
import EmptyDescription from "../../../constants/EmptyDescription";

interface StudentFormProps {
  onFinish: (values: IStudent) => void;
  initialValues?: object;
  formName: string;
  isEdit?: boolean;
  data?: IStudent | null;
  isAbleAdd?: boolean;
  isAddSuccess?: boolean;
  handleDataChange: () => void;
}
const StudentForm: React.FC<StudentFormProps> = ({
  onFinish,
  initialValues,
  formName,
  isEdit,
  data,
  isAbleAdd,
  isAddSuccess,
  handleDataChange,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { reservedStudent, loading } = useReservedStudentStore();

  const handleCancel = () => {
    form.resetFields();
    navigate("/students");
  };

  !loading && console.log(reservedStudent);
  const renderReservingInformation = () => {
    if (!data) return null;

    const hasNoClasses = data?.Classes?.length === 0;
    const isInClass = data?.Classes?.some(
      (studentClass) => studentClass.AttendingStatus === "InClass"
    );

    if (hasNoClasses || !isInClass) {
      return <Empty description={EmptyDescription.ReservingWithoutInClass} />;
    }
    return (
      <div className="add-new-reserving-container">
        <AddReservingStudent
          handleDataChange={handleDataChange}
          id={data?.StudentId}
          isAddNew
          student={data}
        />
      </div>
    );
  };
  return (
    <>
      <Form
        name={formName}
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        layout="horizontal"
        initialValues={initialValues}
        disabled={isAddSuccess}
      >
        <div className="Title">General</div>
        <GeneralInfo isEdit={isEdit} isAddSuccess={isAddSuccess} />

        <div className="Title">Other</div>
        <OtherInfo />

        <div className="btn-save">
          <FormFooter formName={formName} handleCancel={handleCancel} />
        </div>
      </Form>
      {!isAbleAdd && data && (
        <>
          <div>
            <div className="Title">Class Information</div>
            <AddClassToStudent
              data={data}
              isDisabled={!data}
              handleDataChange={handleDataChange}
            />
          </div>
          <div>
            <div className="Title">Reserving Information</div>
            {renderReservingInformation()}
          </div>
        </>
      )}
    </>
  );
};

StudentForm.defaultProps = {
  data: null,
  initialValues: {},
  isEdit: false,
  isAbleAdd: false,
  isAddSuccess: false,
};

export default StudentForm;
