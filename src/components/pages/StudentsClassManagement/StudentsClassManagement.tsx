import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStudentClassStore } from "../../../store/StudentClassStore";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import "../../../styles/main.scss";
import { IStudentClass } from "../../../interfaces/student-class.interface";
import ImportFromExcel from "../../../utils/ImportFromExcel";
import ExcelTemplates from "../../../constants/ExcelTemplates";
import StudentClassTable from "../../templates/StudentClassTable/StudentClassTable";
import { getUserInfo } from "../../../utils/JWTAuth";

interface StudentsClassManagementProps {}
const StudentsClassManagement: React.FC<StudentsClassManagementProps> = () => {
  const { id } = useParams();
  const { handleExcelStudentClass } = ImportFromExcel();
  const { fetchStudentClass, studentClass, loading } = useStudentClassStore();
  const [isExport, setIsExport] = useState<boolean>(false);
  const [isChangeData, setIsChangeData] = useState<boolean>(false);
  const [searchSignal, setSearchSignal] = useState<AbortSignal | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleDataChange = () => {
    setIsChangeData((pre) => !pre);
  };

  const exportData = useCallback(() => {
    setIsExport(true);
  }, []);
  const completedExport = useCallback(() => {
    setIsExport(false);
  }, []);

  useEffect(() => {
    setTimeout(
      () => fetchStudentClass(id ?? "", searchTerm, searchSignal),
      1000
    );
  }, [id, fetchStudentClass, isChangeData, searchTerm, searchSignal]);

  const [studentSelect, setStudentSelect] = useState<IStudentClass[]>([]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    fetchStudentClass(id ?? "", searchTerm, searchSignal);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id, fetchStudentClass, searchTerm, searchSignal]);

  return (
    <div className="table-container">
      <TableHeader
        title="Student Class List"
        href={ExcelTemplates.StudentClass}
        fileDownload="Student Class Import Template"
        excelUpload={handleExcelStudentClass}
        exportData={exportData}
        isSelectedStudent={!studentSelect.length}
        studentClassSelect={studentSelect}
        handleDataChange={handleDataChange}
        isUpdateStudentClassStatus
        setSearchSignal={setSearchSignal}
        setSearchTerm={setSearchTerm}
        isImport={getUserInfo().role === "Admin"}
        isAddStudentClass={getUserInfo().role === "Admin"}
      />
      <div className="table-container__content">
        <StudentClassTable
          classStudent={studentClass ?? []}
          loading={loading}
          handleDataChange={handleDataChange}
          setStudentSelect={setStudentSelect}
          classId={id ?? ""}
          isExport={isExport}
          completedExport={completedExport}
        />
      </div>
    </div>
  );
};

export default StudentsClassManagement;
