import React, { useEffect, useState } from "react";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import { IStudent } from "../../../interfaces/student.interface";
import { useSingleStudentStore } from "../../../store/StudentStore";
import formatDate from "../../../utils/DateFormatting";
import StudentForm from "../../templates/StudentForm/StudentForm";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const AddStudent: React.FC = () => {
  const { postSingleStudent, newStudent, getStudentByID, aStudent } =
    useSingleStudentStore();
  const [isDataChange, setIsDataChange] = useState<boolean>(false);
  const handleDataChange = () => {
    setIsDataChange((pre) => !pre);
  };
  const initialValues = { Status: "Active" };
  const [addedStudent, setAddedStudent] = useState<IStudent | null>(null);
  const [isAbleAdd, setIsAbleAdd] = useState(true);
  const [isAddSuccess, setIsAddSuccess] = useState<boolean>(false);

  const onFinish = async (values: IStudent) => {
    // Convert form
    const studentData: IStudent = {
      ...values,
      DOB: formatDate(values.DOB),
      GraduatedDate: formatDate(values.GraduatedDate),
      AvatarUrl: "",
    };

    await postSingleStudent(studentData);
    newStudent && setAddedStudent(newStudent);
    handleDataChange();
  };

  useEffect(() => {
    newStudent && setAddedStudent(newStudent);
    newStudent && setIsAbleAdd(false);
  }, [newStudent, isDataChange]);
  useEffect(() => {
    // Fetch student data when newStudent changes
    if (newStudent) {
      setTimeout(() => {
        getStudentByID(newStudent.StudentId);
        setIsAddSuccess(true);
      }, 1000);
    }
  }, [getStudentByID, newStudent, isDataChange]);
  useEffect(() => {
    // Update addedStudent when aStudent changes
    aStudent && setAddedStudent(aStudent);
  }, [aStudent, isDataChange]);

  console.log(newStudent);
  console.log(addedStudent);

  return (
    <div className="table-container">
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <TableHeader
        isHeaderBottom={false}
        title="Add Student"
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
      <div className="table-container__content table-container__class">
        <StudentForm
          formName="AddStudent"
          onFinish={onFinish}
          initialValues={initialValues}
          data={addedStudent}
          isAbleAdd={isAbleAdd}
          handleDataChange={handleDataChange}
          isAddSuccess={isAddSuccess}
        />
      </div>
    </div>
  );
};

export default AddStudent;
