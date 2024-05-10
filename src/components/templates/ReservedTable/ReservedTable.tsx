import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { MdMoreHoriz } from "react-icons/md";
import { IReservedStudent } from "../../../interfaces/reserved-student.interface";
import ModalReservation from "../../atoms/TerminalReservation/TerminalReservation";
import { exportReserveStudentToExcel } from "../../../utils/ExportToExcel";
import {
  getDataFromCache,
  storeDataToCache,
} from "../../../utils/StoreDataToCache";
import Gender from "../../atoms/Gender/Gender";
import FontSizes from "../../../constants/FontSizes";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import ActionTitle from "../../atoms/ActionTitle/ActionTitle";
import { GenderFilters } from "../../../constants/TableFilters";

interface ReservedTableProps {
  reservedStudent: IReservedStudent[] | null;
  loading: boolean;
  isExport: boolean;
  completedExport: () => void;
  handleDataChange: () => void;
}

const ReservedTable: React.FC<ReservedTableProps> = ({
  reservedStudent,
  loading,
  isExport = false,
  completedExport,
  handleDataChange,
}) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [rowClick, setRowClick] = useState<number>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<IReservedStudent[]>([]);
  console.log(reservedStudent);

  const columns: TableColumnsType<IReservedStudent> = [
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
      fixed: "left",
      sorter: (a: { FullName: string }, b: { FullName: string }) =>
        a.FullName.localeCompare(b.FullName),
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "Gender",
      render: (_value: boolean, record) => (
        <Gender gender={record.Gender} customFontSize={FontSizes.XsLarger} />
      ),
      filters: GenderFilters,
      filterSearch: true,
      filterMode: "tree",
      onFilter: (value, record) => record.Gender === value,
    },

    {
      title: "Birthday",
      dataIndex: "DOB",
      key: "DOB",
      sorter: (
        a: { DOB: { toString: () => string } },
        b: { DOB: { toString: () => string } }
      ) => a.DOB.toString().localeCompare(b.DOB.toString()),
    },
    {
      title: "Hometown",
      dataIndex: "Area",
      key: "Area",
      sorter: (a: { Area: string }, b: { Area: string }) =>
        a.Area.localeCompare(b.Area),
    },
    {
      title: "Class ID",
      dataIndex: "ClassId",
      key: "ClassId",
      sorter: (a: { ClassId: string }, b: { ClassId: string }) =>
        a.ClassId.localeCompare(b.ClassId),
    },
    {
      title: "Reason",
      dataIndex: "Reason",
      key: "Reason",
      sorter: (a: { Reason: string }, b: { Reason: string }) =>
        a.Reason.localeCompare(b.Reason),
    },
    {
      title: "Reserve start date",
      dataIndex: "StartDate",
      key: "StartDate",
      sorter: (a: IReservedStudent, b: IReservedStudent) => {
        const dateA = a.StartDate ? new Date(a.StartDate) : new Date(0);
        const dateB = b.StartDate ? new Date(b.StartDate) : new Date(0);
        return dateA.getTime() - dateB.getTime();
      },

      render: (reservedStartDate: string) => reservedStartDate,
    },
    {
      title: "Reserve end date",
      dataIndex: "EndDate",
      key: "EndDate",
      sorter: (a: IReservedStudent, b: IReservedStudent) =>
        (a?.EndDate?.toString() || "").localeCompare(
          b?.EndDate?.toString() || ""
        ),

      render: (EndDate: string) => EndDate,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (status: string) => (
        <StatusTag status={status} content={status} />
      ),
    },
    {
      title: <ActionTitle />,
      key: "operation",
      width: 80,
      render: (record: IReservedStudent, _, index) => (
        <div className="centered">
          <ModalReservation
            isShow={isShow && rowClick === index}
            setIsShow={setIsShow}
            data={record}
            handleDataChange={handleDataChange}
          >
            <Button className="btn-more" onClick={() => setRowClick(index)}>
              <MdMoreHoriz />
            </Button>
          </ModalReservation>
        </div>
      ),
    },
  ];

  const onSelectChange = (
    selectedRowKey: React.Key[],
    selectedRow: IReservedStudent[]
  ) => {
    setSelectedRowKeys(selectedRowKey);
    setSelectedRows(selectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const scoresWithKeys = Array.isArray(reservedStudent)
    ? reservedStudent?.map((student, index) => ({
        ...student,
        Id: `${student.StudentId}_${student.ClassId}`,
        key: `${student?.StudentId}_${student?.ClassId}_${student?.StartDate}_${student?.Reason}_${index}`,
      }))
    : [];

  const onChange: TableProps<IReservedStudent>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    const dataStorage = extra.currentDataSource;
    storeDataToCache(dataStorage, "studentReserve");
  };

  const handleExport = () => {
    const dataCache = getDataFromCache("studentReserve") as IReservedStudent[];
    const dataExport =
      selectedRowKeys.length > 0 ? selectedRows : dataCache || scoresWithKeys;
    exportReserveStudentToExcel(columns, dataExport);
  };
  if (isExport) {
    handleExport();
    setTimeout(() => {
      completedExport();
    }, 200);
  }
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
        bordered
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "50", "100"],
          total: scoresWithKeys.length,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default ReservedTable;
