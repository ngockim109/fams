import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Modal, Select, Spin } from "antd";
import { VscError } from "react-icons/vsc";
import dayjs from "dayjs";
import { CommonButton } from "../../atoms/CustomButton/CustomButton";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import Sizes from "../../../constants/Sizes";
import Colors from "../../../constants/Colors";
import rules from "../../../utils/ScoreValidation";
import "./EditStudentInClass.scss";
import { useSingleStudentClassStore } from "../../../store/StudentClassStore";
import { IPartStudentClass } from "../../../interfaces/student-class.interface";
import formatDate from "../../../utils/DateFormatting";

const { Option } = Select;

interface EditStudentInClassProps {
  studentId: string;
  classId: string;
  handleDataChange: () => void;
}
const EditStudentInClass: React.FC<EditStudentInClassProps> = ({
  studentId,
  classId,
  handleDataChange,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const {
    studentClass,
    getSingleStudentInClass,
    loading,
    putSingleStudentInClass,
  } = useSingleStudentClassStore();

  useEffect(() => {
    getSingleStudentInClass(classId ?? "", studentId ?? "");
  }, [classId, getSingleStudentInClass, studentId, handleDataChange, form]);

  const initialValues = {
    StudentId: studentId ?? "",
    ClassId: classId ?? "",
    CertificationStatus: studentClass?.CertificationStatus ?? "",
    CertificationDate:
      studentClass?.CertificationDate === "No Information"
        ? null
        : dayjs(studentClass?.CertificationDate, "DD/MM/YYYY"),
    FinalScore: studentClass?.FinalScore ?? null,
    Method: studentClass?.Method ?? null,
  };
  console.log(studentClass);
  console.log(initialValues);
  const certificationStatusList = [
    { text: "Not yet", value: "NotYet" },
    { text: "Waiting", value: "Waiting" },
    { text: "Received", value: "Received" },
  ];
  interface EditStudentClassFormType {
    CertificationStatus: string;
    CertificationDate: string;
    FinalScore: number;
    Method: number;
  }
  const resetForm = () => {
    form.resetFields();
    form.setFieldsValue({
      StudentId: "",
      ClassId: "",
      CertificationStatus: "",
      CertificationDate: null,
      FinalScore: null,
      Method: null,
    });
  };

  const handleCancel = () => {
    setModalOpen(false);
    resetForm();
  };
  const handleOk = () => {
    setModalOpen(false);
    resetForm();
  };
  const handleEditClick = () => {
    setModalOpen(true);
    form.setFieldsValue(initialValues);
  };
  const onFinish = (values: EditStudentClassFormType) => {
    const editedStudent: IPartStudentClass = {
      CertificationStatus: values?.CertificationStatus ?? "",
      CertificationDate: formatDate(values?.CertificationDate) ?? "",
      FinalScore: values?.FinalScore ?? -1,
      Method: values?.Method ?? -1,
    };
    putSingleStudentInClass(classId, studentId, editedStudent);
    handleOk();
    handleDataChange();
  };

  return (
    <div>
      <CommonButton text="Edit" onClick={handleEditClick} />
      <Modal
        title={<div className="modal-header-custom centered">Edit Student</div>}
        forceRender
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={
          <div className="centered">
            <FormFooter
              handleCancel={handleCancel}
              formName={`EditStudentInClass_${studentId}`}
            />
          </div>
        }
        className="add-reserving-form"
        width="50%"
        closeIcon={<VscError size={Sizes.LgMedium} color={Colors.White} />}
        open={isModalOpen}
      >
        {loading ? (
          <Spin />
        ) : (
          studentClass && (
            <Form
              layout="vertical"
              className="add-class-form"
              onFinish={onFinish}
              name={`EditStudentInClass_${studentId}`}
              form={form}
              initialValues={initialValues}
            >
              <div className="input-group">
                <Form.Item
                  label="Student ID"
                  className="form-item"
                  name="StudentId"
                >
                  <Input type="text" disabled />
                </Form.Item>
                <Form.Item
                  label="Class ID"
                  className="form-item"
                  name="ClassId"
                >
                  <Input type="text" disabled />
                </Form.Item>
              </div>
              <div className="input-group">
                <Form.Item
                  label="Certification Status"
                  className="form-item"
                  name="CertificationStatus"
                  rules={[
                    {
                      required: true,
                      message: "Please select certification status",
                    },
                  ]}
                >
                  <Select placeholder="Enter certificate status">
                    {certificationStatusList?.map((status) => (
                      <Option key={status?.value} value={status?.value}>
                        {status?.text}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Certification Date"
                  name="CertificationDate"
                  className="form-item"
                  rules={[
                    {
                      required: true,
                      message: "Please enter certification date",
                    },
                  ]}
                >
                  <DatePicker
                    className="date-picker-form-item"
                    format="DD/MM/YYYY"
                    placeholder="Enter certification date"
                  />
                </Form.Item>
              </div>
              <div className="input-group">
                <Form.Item
                  label="Final Score"
                  name="FinalScore"
                  className="form-item"
                  rules={[
                    { required: true, message: "Please enter final score" },
                    ...rules,
                  ]}
                >
                  <Input
                    type="number"
                    step={0.1}
                    placeholder="Enter final score"
                  />
                </Form.Item>
                <Form.Item
                  label="Method"
                  name="Method"
                  className="form-item"
                  rules={[{ required: true, message: "Please enter method" }]}
                >
                  <Input type="number" step={0.1} placeholder="Enter method" />
                </Form.Item>
              </div>
            </Form>
          )
        )}
      </Modal>
    </div>
  );
};

export default EditStudentInClass;
