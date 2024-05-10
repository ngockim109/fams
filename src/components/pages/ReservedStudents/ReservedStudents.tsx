/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useReservedStudentStore } from "../../../store/ReservedStudentStore";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import ReservedTable from "../../templates/ReservedTable/ReservedTable";
import ExcelTemplates from "../../../constants/ExcelTemplates";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const ReservedStudents: React.FC = () => {
  const { fetchReservedStudent, reservedStudent, loading } =
    useReservedStudentStore();
  const [isExport, setIsExport] = useState<boolean>(false);
  const [isChangeData, setIsChangeData] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchSignal, setSearchSignal] = useState<AbortSignal | undefined>();
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
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    setTimeout(() => fetchReservedStudent(searchTerm, searchSignal), 500);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isChangeData, searchSignal, searchTerm]);

  return (
    <div className="table-container">
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <TableHeader
        title="Reserve List"
        href={ExcelTemplates.ReservedStudent}
        fileDownload="Reserved Student Import Template"
        exportData={exportData}
        handleDataChange={handleDataChange}
        isImport={false}
        showAddModal
        setSearchTerm={setSearchTerm}
        setSearchSignal={setSearchSignal}
      />
      <div className="table-container__content">
        <ReservedTable
          reservedStudent={reservedStudent ?? []}
          loading={loading}
          isExport={isExport}
          completedExport={completedExport}
          handleDataChange={handleDataChange}
        />
      </div>
    </div>
  );
};

export default ReservedStudents;
