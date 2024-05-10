/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { IStudentClass } from "../../../interfaces/student-class.interface";
import CustomDropdown from "../../molecules/CustomDropdown/CustomDropdown";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import ActionTitle from "../../atoms/ActionTitle/ActionTitle";
import RouterEndpoints from "../../../constants/RouterEndpoints";
import {
  getDataFromCache,
  storeDataToCache,
} from "../../../utils/StoreDataToCache";
import { exportStudentClassToExcel } from "../../../utils/ExportToExcel";
import { handleFirstLetterUpperCaseAndBackspace } from "../../../utils/HandleDataShown";
import {
  AttendingStatusFilters,
  CertificationStatusFilters,
  GPALevelFilters,
  ResultFilters,
} from "../../../constants/TableFilters";
import { getUserInfo } from "../../../utils/JWTAuth";

interface StudentClassTableProps {
  classStudent: IStudentClass[];
  loading: boolean;
  handleDataChange: () => void;
  setStudentSelect: React.Dispatch<React.SetStateAction<IStudentClass[]>>;
  classId: string;
  isExport: boolean;
  completedExport: () => void;
}

const StudentClassTable: React.FC<StudentClassTableProps> = ({
  classStudent,
  loading,
  handleDataChange,
  setStudentSelect,
  classId,
  isExport,
  completedExport,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<IStudentClass[]>([]);

  const columns: TableColumnsType<IStudentClass> = [
    {
      title: "Student ID",
      dataIndex: "StudentId",
      key: "StudentId",
      fixed: "left",
      sorter: (a, b) => a.StudentId.localeCompare(b.StudentId),
    },
    {
      title: "Full name",
      dataIndex: "FullName",
      key: "FullName",
      fixed: "left",
      sorter: (a, b) => a.FullName.localeCompare(b.FullName),
    },
    {
      title: "Attending Status",
      dataIndex: "AttendingStatus",
      key: "AttendingStatus",
      render: (status) => (
        <div className="centered">
          <StatusTag
            status={handleFirstLetterUpperCaseAndBackspace(status)}
            content={handleFirstLetterUpperCaseAndBackspace(status)}
          />
        </div>
      ),
      filters: AttendingStatusFilters,
      filterSearch: true,
      filterMode: "tree",
      onFilter: (value, record) => record.AttendingStatus === value,
    },
    {
      title: "Final Score",
      dataIndex: "FinalScore",
      key: "FinalScore",
      sorter: (a, b) => a.FinalScore - b.FinalScore,
    },
    {
      title: "Result",
      dataIndex: "Result",
      key: "Result",
      render: (result) => (
        <div className="centered">
          <StatusTag
            status={handleFirstLetterUpperCaseAndBackspace(result)}
            content={handleFirstLetterUpperCaseAndBackspace(result)}
          />
        </div>
      ),
      filters: ResultFilters,
      filterSearch: true,
      filterMode: "tree",
      onFilter: (value, record) => record.Result === value,
    },
    {
      title: "Certification Date",
      dataIndex: "CertificationDate",
      key: "CertificationDate",
      sorter: (a, b) =>
        a.CertificationDate.toString().localeCompare(
          b.CertificationDate.toString()
        ),
      render: (date: string) =>
        date === "No Information" ? <StatusTag status="default" /> : date,
    },
    {
      title: "Certification Status",
      dataIndex: "CertificationStatus",
      key: "CertificationStatus",
      render: (status) => (
        <div className="centered">
          <StatusTag
            status={handleFirstLetterUpperCaseAndBackspace(status)}
            content={handleFirstLetterUpperCaseAndBackspace(status)}
          />
        </div>
      ),
      filters: CertificationStatusFilters,
      filterSearch: true,
      filterMode: "tree",
      onFilter: (value, record) => record.CertificationStatus === value,
    },
    {
      title: "GPA Level",
      dataIndex: "GPALevel",
      key: "GPALevel",
      render: (level) => (
        <div className="centered">
          <StatusTag
            status={handleFirstLetterUpperCaseAndBackspace(level)}
            content={handleFirstLetterUpperCaseAndBackspace(level)}
          />
        </div>
      ),
      filters: GPALevelFilters,
      filterSearch: true,
      filterMode: "tree",
      onFilter: (value, record) => record.GPALevel === value,
    },
    {
      title: <ActionTitle />,
      key: "operation",
      width: 80,
      render: (record: { StudentId: string | undefined }) => (
        <div className="centered">
          <CustomDropdown
            id={record?.StudentId}
            viewLink={`${RouterEndpoints.ClassesManagement}/${classId}/student-management`}
            isEdit={false}
            isEditStudentInClass={getUserInfo().role === "Admin"}
            isDeleteStudentInClass={getUserInfo().role === "Admin"}
            classId={classId}
            handleDataChange={handleDataChange}
          />
        </div>
      ),
    },
  ];
  const onSelectChange = (
    selectedRowKey: React.Key[],
    selectedRow: IStudentClass[]
  ) => {
    setSelectedRowKeys(selectedRowKey);
    setSelectedRows(selectedRow);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const scoresWithKeys = classStudent.map((student) => ({
    ...student,
    key: student.Id,
  }));
  const onChange: TableProps<IStudentClass>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    const dataStorage = extra.currentDataSource;
    storeDataToCache(dataStorage, "StudentClass");
  };

  const handleExport = () => {
    const dataCache = getDataFromCache("StudentClass") as IStudentClass[];
    const dataExport =
      selectedRowKeys.length > 0 ? selectedRows : dataCache || scoresWithKeys;
    exportStudentClassToExcel(columns, dataExport);
  };
  if (isExport) {
    handleExport();
    setTimeout(() => {
      completedExport();
    }, 200);
  }
  useEffect(() => {
    // Map selectedRowKeys to actual IStudent objects
    const selectedStudents = scoresWithKeys.filter((selectedStudent) =>
      selectedRowKeys.includes(selectedStudent.key)
    );

    // Update the state using setStudentSelect
    setStudentSelect(selectedStudents);
  }, [selectedRowKeys, setStudentSelect]);

  useEffect(() => {
    // Map selectedRowKeys to actual IStudent objects
    const selectedStudents = scoresWithKeys.filter((selectedStudent) =>
      selectedRowKeys.includes(selectedStudent.key)
    );

    // Update the state using setStudentSelect
    setStudentSelect(selectedStudents);
  }, [selectedRowKeys, setStudentSelect]);
  return (
    <div className="ant-table-container">
      <Table
        scroll={{ x: "max-content" }}
        style={{ flex: 1, overflowY: "auto" }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={scoresWithKeys}
        loading={loading}
        bordered
        onChange={onChange}
      />
    </div>
  );
};

export default StudentClassTable;
