import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import { VscError } from "react-icons/vsc";
import { SearchProps } from "antd/es/input";
import { useParams } from "react-router";
import { IStudent } from "../../../interfaces/student.interface";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import { AddButton } from "../../atoms/CustomButton/CustomButton";
import Sizes from "../../../constants/Sizes";
import Colors from "../../../constants/Colors";
import { useSingleStudentStore } from "../../../store/StudentStore";
import { useSingleStudentClassStore } from "../../../store/StudentClassStore";

const { Search } = Input;
interface AddStudentsClassProps {
  handleDataChange: () => void;
}

const AddStudentsClass: React.FC<AddStudentsClassProps> = ({
  handleDataChange,
}) => {
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const { id } = useParams();
  const { getStudentByID, aStudent } = useSingleStudentStore();
  const { postSingleStudentToClass } = useSingleStudentClassStore();
  const [form] = Form.useForm();

  const initialValues = {
    FullName: "",
    Email: "",
    GPA: null,
    Status: "",
    Major: "",
    StudentId: "",
  };
  const resetFormValue = () => {
    form.resetFields();
    form.setFieldsValue(initialValues);
  };
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    resetFormValue();
  };

  const handleOk = async () => {
    resetFormValue();
    setOpen(false);
  };
  const onSearch: SearchProps["onSearch"] = async (value) => {
    setStudentId(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      StudentId: (aStudent as IStudent)?.StudentId ?? studentId ?? "",
      FullName: (aStudent as IStudent)?.FullName || "",
      Email: (aStudent as IStudent)?.Email || "",
      Major: (aStudent as IStudent)?.Major || "",
      Status: (aStudent as IStudent)?.Status || "",
      GPA: (aStudent as IStudent)?.GPA ?? null,
    });
  }, [aStudent, form, studentId]);

  useEffect(() => {
    studentId !== "" && getStudentByID(studentId);
  }, [getStudentByID, studentId]);

  useEffect(() => {
    studentId === "" && resetFormValue();
  }, [studentId]);

  type AddStudentToClassProps = {
    StudentId: string;
  };
  const onFinish = (values: AddStudentToClassProps) => {
    console.log(values);
    id && id !== "" && postSingleStudentToClass(id, values?.StudentId);
    handleDataChange();
    handleOk();
  };

  return (
    <div>
      <AddButton text="Add new" onClick={showModal} />
      <Modal
        title={
          <div className="modal-header-custom centered">
            Add Student To Class
          </div>
        }
        forceRender
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={
          <div className="centered">
            <FormFooter
              handleCancel={handleCancel}
              formName="AddStudentClass"
            />
          </div>
        }
        className="add-reserving-form"
        width="50%"
        closeIcon={<VscError size={Sizes.LgMedium} color={Colors.White} />}
      >
        <Form
          layout="vertical"
          className="add-class-form"
          form={form}
          name="AddStudentClass"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <div className="form-row">
            <Form.Item
              label="Student ID"
              className="form-item"
              name="StudentId"
              rules={[
                { required: true, message: "Please search a student ID" },
              ]}
            >
              <Search
                placeholder="Input Student ID"
                allowClear
                onSearch={onSearch}
                loading={false}
              />
            </Form.Item>
            <Form.Item
              label="Student Name"
              className="form-item"
              name="FullName"
            >
              <Input disabled />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item label="Email" className="form-item" name="Email">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Major" className="form-item" name="Major">
              <Input disabled />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item label="Status" className="form-item" name="Status">
              <Input disabled />
            </Form.Item>
            <Form.Item label="GPA" className="form-item" name="GPA">
              <Input disabled />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddStudentsClass;
