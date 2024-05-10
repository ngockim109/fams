import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Input } from "antd";
import { VscError } from "react-icons/vsc";
import { IStudent } from "../../../interfaces/student.interface";
import ClassDetailInfoModal from "../ClassDetailInfoModal/ClassDetailInfoModal";
import FormFooter from "../../molecules/FormFooter/FormFooter";
import { useClassStore, useSingleClassStore } from "../../../store/ClassStore";
import Sizes from "../../../constants/Sizes";
import Colors from "../../../constants/Colors";
import { AddButtonWithCircle } from "../CustomButton/CustomButton";
import "./AddClassToStudent.scss";
import { useSingleStudentClassStore } from "../../../store/StudentClassStore";
import { IClass } from "../../../interfaces/class.interface";

const { Option } = Select;

interface Props {
  data: IStudent | null;
  isDisabled?: boolean;
  handleDataChange: () => void;
}

const AddClassToStudent: React.FC<Props> = ({
  data,
  isDisabled,
  handleDataChange,
}) => {
  const [open, setOpen] = useState(false);
  const [classId, setClassId] = useState<string>("");
  const [classDetail, setClassDetail] = useState<IClass | null>(null);
  const { aClass, getClassByID } = useSingleClassStore();
  const { classes, fetchClass } = useClassStore();
  const { postSingleStudentToClass } = useSingleStudentClassStore();

  const [form] = Form.useForm();

  const handleClassChange = (value: string) => {
    setClassId(value);
  };
  useEffect(() => {
    classId && getClassByID(classId);
  }, [getClassByID, classId]);

  useEffect(() => {
    aClass && classId && setClassDetail(aClass);
  }, [aClass, classId]);

  useEffect(() => {
    classId === "" && setClassDetail(null);
  }, [classId]);

  useEffect(() => {
    classDetail &&
      form.setFieldsValue({
        ClassId: classDetail?.Id,
        ClassName: classDetail?.ClassName,
        StartDate: classDetail?.StartDate,
        EndDate: classDetail?.EndDate,
      });
  }, [classDetail]);

  useEffect(() => {
    fetchClass();
  }, [data, fetchClass]);

  const showModal = () => {
    setOpen(true);
  };

  const resetForm = () => {
    form.resetFields();
    form.setFieldsValue({
      ClassId: "",
      ClassName: "",
      StartDate: "",
      EndDate: "",
    });
    setClassId("");
  };

  const handleCancel = () => {
    setOpen(false);
    resetForm();
  };

  interface AddClassToStudentFormType {
    ClassId: string;
    ClassName: string;
    StartDate: string;
    EndDate: string;
  }
  const handleOk = () => {
    setOpen(false);
    resetForm();
    setClassId("");
    handleDataChange();
  };
  const onFinish = (values: AddClassToStudentFormType) => {
    const selectedClassId = values?.ClassId;
    const studentId = data?.StudentId ?? "";
    postSingleStudentToClass(selectedClassId, studentId);
    handleOk();
  };

  const initialValues = {
    ClassId: "",
    ClassName: "",
    StartDate: "",
    EndDate: "",
  };

  return (
    <div className="addclass">
      <div className={`button-add-class ${isDisabled && " btn-disable"}`}>
        <AddButtonWithCircle onClick={showModal} />
      </div>

      <Modal
        title={
          <div className="modal-header-custom centered">
            Add Class To Student
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
              formName="AddClassToStudent"
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
          onFinish={onFinish}
          name="AddClassToStudent"
          form={form}
          initialValues={initialValues}
        >
          <div className="form-row">
            <Form.Item label="Class ID" className="form-item" name="ClassId">
              <Select
                value={classId}
                onChange={(value) => handleClassChange(value)}
              >
                {classes?.map((classItem) => (
                  <Option key={classItem.Id} value={classItem.Id}>
                    {classItem.Id}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Class Name"
              className="form-item"
              name="ClassName"
            >
              <Input disabled />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item
              label="Start Date"
              className="form-item"
              name="StartDate"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item label="End Date" className="form-item" name="EndDate">
              <Input disabled />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <div className="student-class">
        {data?.Classes?.map((classDetailInfo) => (
          <ClassDetailInfoModal
            key={classDetailInfo.ClassId}
            studentClass={classDetailInfo}
          />
        ))}
      </div>
    </div>
  );
};

AddClassToStudent.defaultProps = {
  isDisabled: false,
};

export default AddClassToStudent;
