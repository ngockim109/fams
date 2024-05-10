import React, { useEffect } from "react";
import TableHeader from "../../organisms/TableHeader/TableHeader";
import { useClassStore } from "../../../store/ClassStore";
import ClassTable from "../../templates/ClassesTable/ClassesTable";
import CustomBreadcrumb from "../../atoms/CustomBreadcrumb/CustomBreadcrumb";

const ClassesManagement: React.FC = () => {
  const { fetchClass, classes, loading } = useClassStore();
  useEffect(() => {
    fetchClass();
  }, [fetchClass]);

  return (
    <div className="table-container">
      <div className="breadcrumb-frame-custom">
        <CustomBreadcrumb />
      </div>
      <TableHeader
        title="Class List"
        isExport={false}
        isImport={false}
        isSearch={false}
        isHeaderBottom={false}
        setSearchSignal={() => {}}
        setSearchTerm={() => {}}
      />
      <div className="table-container__content table-container__class">
        <ClassTable loading={loading} classes={classes ?? []} />
      </div>
    </div>
  );
};

export default ClassesManagement;
