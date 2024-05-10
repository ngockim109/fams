import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import CustomDropdown from "../../molecules/CustomDropdown/CustomDropdown";
import { IUser } from "../../../interfaces/user.interface";
import Gender from "../../atoms/Gender/Gender";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import RouterEndpoints from "../../../constants/RouterEndpoints";
import { exportUserToExcel } from "../../../utils/ExportToExcel";
import {
  getDataFromCache,
  storeDataToCache,
} from "../../../utils/StoreDataToCache";
import {
  GenderFilters,
  UserRoleFilters,
  UserStatusFilters,
} from "../../../constants/TableFilters";
import ActionTitle from "../../atoms/ActionTitle/ActionTitle";

interface UserTableProps {
  user: IUser[];
  loading: boolean;
  handleDataChange: () => void;
  isExport: boolean;
  completedExport: () => void;
}

const UserTable: React.FC<UserTableProps> = ({
  user,
  loading,
  isExport,
  completedExport,
  handleDataChange,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<IUser[]>([]);

  const columns: TableColumnsType<IUser> = [
    {
      title: "ID",
      dataIndex: "Id",
      key: "Id",
      width: 100,
      sorter: (a, b) => a.Id.localeCompare(b.Id),
    },
    {
      title: "Full Name",
      dataIndex: "FullName",
      key: "FullName",
      width: 170,
      sorter: (a, b) => a.FullName.localeCompare(b.FullName),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      width: 170,
      sorter: (a, b) => a.Email.localeCompare(b.Email),
    },
    {
      title: "Date of Birth",
      dataIndex: "DOB",
      key: "DOB",
      sorter: (a, b) => a.DOB.toString().localeCompare(b.DOB.toString()),
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "Gender",
      render: (gender) => (
        <div className="centered">
          <Gender gender={gender} />
        </div>
      ),
      filters: GenderFilters,
      filterMode: "tree",
      onFilter: (value, record) => record.Gender === value,
    },
    {
      title: "User Role",
      dataIndex: "Role",
      key: "Role",
      render: (role) => (
        <div className="centered">
          <StatusTag status={role} content={role} />
        </div>
      ),
      filters: UserRoleFilters,
      filterMode: "tree",
      onFilter: (value, record) => record.Role === value,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (role) => (
        <div className="centered">
          <StatusTag status={role} content={role} />
        </div>
      ),
      filters: UserStatusFilters,
      filterMode: "tree",
      onFilter: (value, record) => record.Status === value,
    },
    {
      title: <ActionTitle />,
      key: "operation",
      width: 80,
      render: (_value, record) => (
        <div className="centered">
          <CustomDropdown
            id={record?.Id}
            viewLink={RouterEndpoints.UsersManagement}
            isEditUser
            isEnableUser={record.Status !== "Active"}
            isDeleteUser={record.Status === "Active"}
            handleDataChange={handleDataChange}
          />
        </div>
      ),
    },
  ];

  const scoresWithKeys = user.map((_student) => ({
    ..._student,
    key: _student.Id,
  }));
  const onChange: TableProps<IUser>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    const dataStorage = extra.currentDataSource;
    storeDataToCache(dataStorage, "users");
  };
  const onSelectChange = (
    selectedRowKey: React.Key[],
    selectedRow: IUser[]
  ) => {
    setSelectedRowKeys(selectedRowKey);
    setSelectedRows(selectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleExport = () => {
    const dataCache = getDataFromCache("users") as IUser[];
    const dataExport =
      selectedRowKeys.length > 0 ? selectedRows : dataCache || scoresWithKeys;
    exportUserToExcel(columns, dataExport);
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
        columns={columns}
        dataSource={scoresWithKeys}
        rowSelection={rowSelection}
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

export default UserTable;
