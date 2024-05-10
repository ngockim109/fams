/** This function component is Modal contain Form with response for add information for user
 * Usage:
 * <EditStudent/>
 */
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import { IStudent } from "../../../interfaces/student.interface";
import formatDate from "../../../utils/DateFormatting";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import { useSingleStudentStore } from "../../../store/StudentStore";
import StudentForm from "../../templates/StudentForm/StudentForm";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const EditStudent: React.FC = () => {
  const { id } = useParams();
  const [isDataChange, setIsDataChange] = useState<boolean>(false);
  const handleDataChange = () => {
    setIsDataChange((pre) => !pre);
  };

  // USE STORES
  const { aStudent, getStudentByID, putSingleStudent, loading } =
    useSingleStudentStore();
  console.log(aStudent);

  const initialValues = {
    StudentId: aStudent?.StudentId,
    FullName: aStudent?.FullName,
    Gender: aStudent?.Gender,
    Email: aStudent?.Email,
    DOB: dayjs(aStudent?.DOB, "DD/MM/YYYY"),
    Phone: aStudent?.Phone,
    Status: aStudent?.Status,
    AvatarUrl: aStudent?.AvatarUrl,
    Area: aStudent?.Area,
    Address: aStudent?.Address,
    University: aStudent?.University,
    Major: aStudent?.Major,
    GPA: aStudent?.GPA,
    GraduatedDate: dayjs(aStudent?.GraduatedDate, "DD/MM/YYYY"),
    ClassStartDate: dayjs(aStudent?.ClassStartDate, "DD/MM/YYYY"),
    Class: aStudent?.Class,
    Classes: aStudent?.Classes,
    FAAccount: aStudent?.FAAccount,
  };

  useEffect(() => {
    setTimeout(() => getStudentByID(id ?? ""), 500);
  }, [id, getStudentByID, isDataChange]);

  const handleOk = () => {
    setTimeout(() => handleDataChange(), 500);
  };

  // Function handles form submit, get value and send this to api,
  // then reset form fields and close modal
  const onFinish = (values: IStudent) => {
    const userData: IStudent = {
      ...values,
      StudentId: aStudent?.StudentId || "",
      DOB: formatDate(values.DOB),
      AvatarUrl: aStudent?.AvatarUrl || "",
      GraduatedDate: formatDate(values.GraduatedDate),
      ClassStartDate: formatDate(values.ClassStartDate),
    };
    putSingleStudent(userData, id || "");
    handleOk();
  };

  return (
    <div className="table-container">
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <TableHeader
        isHeaderBottom={false}
        title="Edit Student"
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
      <div className="table-container__content table-container__class">
        {loading ? (
          <div className="spin-container">
            <Spin />
          </div>
        ) : (
          <StudentForm
            handleDataChange={handleDataChange}
            onFinish={onFinish}
            formName={`EditStudent_${id}`}
            isEdit
            data={aStudent || null}
            initialValues={initialValues}
          />
        )}
      </div>
    </div>
  );
};

export default EditStudent;
