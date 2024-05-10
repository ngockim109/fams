/* eslint-disable react-hooks/exhaustive-deps */
//  eslint-disable react-hooks/exhaustive-deps
import React, { useCallback, useEffect, useState } from "react";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import { useUserStore } from "../../../store/UserStore";
import UserTable from "../../templates/UserTable/UserTable";
import ImportFromExcel from "../../../utils/ImportFromExcel";
import ExcelTemplates from "../../../constants/ExcelTemplates";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const UserManagement: React.FC = () => {
  const { handleExcelUser } = ImportFromExcel();
  const { fetchUser, user, loading } = useUserStore();
  const [isChangeData, setIsChangeData] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchSignal, setSearchSignal] = useState<AbortSignal | undefined>();

  const handleDataChange = () => {
    setIsChangeData((pre) => !pre);
  };
  const [isExport, setIsExport] = useState<boolean>(false);
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
    setTimeout(() => fetchUser(searchTerm, searchSignal), 500);
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
        title="User Management"
        href={ExcelTemplates.User}
        fileDownload="User Import Template"
        excelUpload={handleExcelUser}
        isAddUser
        isSearch
        exportData={exportData}
        handleDataChange={handleDataChange}
        setSearchSignal={setSearchSignal}
        setSearchTerm={setSearchTerm}
      />
      <div className="table-container__content">
        <UserTable
          user={user ?? []}
          loading={loading}
          handleDataChange={handleDataChange}
          isExport={isExport}
          completedExport={completedExport}
        />
      </div>
    </div>
  );
};

export default UserManagement;
