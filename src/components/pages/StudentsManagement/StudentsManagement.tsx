/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useStudentStore } from "../../../store/StudentStore";
import StudentTable from "../../templates/StudentTable/StudentTable";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import { IStudent } from "../../../interfaces/student.interface";
import ImportFromExcel from "../../../utils/ImportFromExcel";
import ExcelTemplates from "../../../constants/ExcelTemplates";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const StudentsManagement: React.FC = () => {
  const { handleExcelStudent } = ImportFromExcel();
  const { fetchStudent, student, loading } = useStudentStore();
  const [isChangeData, setIsChangeData] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchSignal, setSearchSignal] = useState<AbortSignal | undefined>();
  const handleDataChange = () => {
    setIsChangeData((pre) => !pre);
  };

  const [isExport, setIsExport] = useState<boolean>(false);
  const [studentSelect, setStudentSelect] = useState<IStudent[]>([]);
  const exportData = useCallback(() => {
    setIsExport(true);
  }, []);
  const completedExport = useCallback(() => {
    setIsExport(false);
  }, []);
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    setTimeout(() => fetchStudent(searchTerm, searchSignal), 500);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isChangeData, searchTerm, searchSignal]);

  return (
    <div className="table-container">
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <TableHeader
        title="Student List"
        href={ExcelTemplates.Student}
        fileDownload="Student Import Template"
        excelUpload={handleExcelStudent}
        exportData={exportData}
        isSelectedStudent={!studentSelect.length}
        studentSelect={studentSelect}
        isAddStudent
        setSearchTerm={setSearchTerm}
        setSearchSignal={setSearchSignal}
      />
      <div className="table-container__content">
        <StudentTable
          student={student ?? []}
          loading={loading}
          isExport={isExport}
          completedExport={completedExport}
          setStudentSelect={setStudentSelect}
          handleDataChange={handleDataChange}
        />
      </div>
    </div>
  );
};

export default StudentsManagement;
