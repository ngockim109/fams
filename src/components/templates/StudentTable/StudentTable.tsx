/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { IStudent } from "../../../interfaces/student.interface";
import CustomDropdown from "../../molecules/CustomDropdown/CustomDropdown";
import {
  getDataFromCache,
  storeDataToCache,
} from "../../../utils/StoreDataToCache";
import { exportStudentToExcel } from "../../../utils/ExportToExcel";
import ActionTitle from "../../atoms/ActionTitle/ActionTitle";
import RouterEndpoints from "../../../constants/RouterEndpoints";
import { handleNumberShown } from "../../../utils/HandleDataShown";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import { StudentStatusFilters } from "../../../constants/TableFilters";

interface StudentTableProps {
  student: IStudent[];
  loading: boolean;
  isExport: boolean;
  completedExport: () => void;
  handleDataChange: () => void;
  setStudentSelect: React.Dispatch<React.SetStateAction<IStudent[]>>;
}

const StudentTable: React.FC<StudentTableProps> = ({
  student,
  loading,
  isExport,
  completedExport,
  handleDataChange,
  setStudentSelect,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<IStudent[]>([]);

  const columns: TableColumnsType<IStudent> = [
    {
      title: "Student ID",
      dataIndex: "StudentId",
      key: "StudentId",
      fixed: "left",
      sorter: (a: { StudentId: string }, b: { StudentId: string }) =>
        a.StudentId.localeCompare(b.StudentId),
    },
    {
      title: "Full name",
      dataIndex: "FullName",
      key: "FullName",
      sorter: (a, b) => a.FullName.localeCompare(b.FullName),
    },
    {
      title: "Birthday",
      dataIndex: "DOB",
      key: "DOB",
      sorter: (a, b) => a.DOB.toString().localeCompare(b.DOB.toString()),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      sorter: (a, b) => a.Email.localeCompare(b.Email),
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      fixed: "left",
    },
    {
      title: "GPA",
      dataIndex: "GPA",
      key: "GPA",
      sorter: (a, b) => a.GPA - b.GPA,
      render: (value) => handleNumberShown(value),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (status: string) => (
        <StatusTag status={status} content={status} />
      ),
      filters: StudentStatusFilters,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.Status.includes(value as string),
    },
    {
      title: <ActionTitle />,
      key: "operation",
      width: 80,
      render: (_value, record) => (
        <div className="centered">
          <CustomDropdown
            id={record?.StudentId}
            viewLink={RouterEndpoints.StudentsManagement}
            editLink={`${RouterEndpoints.StudentsManagement}/edit`}
            handleDataChange={handleDataChange}
            isDelete
          />
        </div>
      ),
    },
  ];

  const onSelectChange = (
    selectedRowKey: React.Key[],
    selectedRow: IStudent[]
  ) => {
    setSelectedRowKeys(selectedRowKey);
    setSelectedRows(selectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const scoresWithKeys = student.map((_student, index) => ({
    ..._student,
    key: index,
  }));

  const onChange: TableProps<IStudent>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    const dataStorage = extra.currentDataSource;
    storeDataToCache(dataStorage, "student");
  };

  const handleExport = () => {
    const dataCache = getDataFromCache("student") as IStudent[];
    const dataExport =
      selectedRowKeys.length > 0 ? selectedRows : dataCache || scoresWithKeys;
    exportStudentToExcel(columns, dataExport);
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

  return (
    <div
      style={{
        maxHeight: "70%",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
      }}
      className="ant-table-container"
    >
      <Table
        size="middle"
        scroll={{ x: "max-content" }}
        style={{ flex: 1, overflowY: "auto" }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={scoresWithKeys}
        loading={loading}
        onChange={onChange}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "50", "100"],
          total: scoresWithKeys.length,
          showSizeChanger: true,
        }}
        bordered
      />
    </div>
  );
};

export default StudentTable;
