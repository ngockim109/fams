import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { IEmail } from "../../../interfaces/email.interface";
import { storeDataToCache } from "../../../utils/StoreDataToCache";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import CustomDropdown from "../../molecules/CustomDropdown/CustomDropdown";
import ActionTitle from "../../atoms/ActionTitle/ActionTitle";
import RouterEndpoints from "../../../constants/RouterEndpoints";
import {
  EmailCategoryFilters,
  EmailStatusFilters,
  ReceiverTypeFilters,
} from "../../../constants/TableFilters";

interface EmailTableProps {
  email: IEmail[];
  loading: boolean;
  handleDataChange: () => void;
}

const EmailTable: React.FC<EmailTableProps> = ({
  email,
  loading,
  handleDataChange,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableColumnsType<IEmail> = [
    {
      title: "Template name",
      dataIndex: "Name",
      key: "Name",
      width: 170,
      sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (_value, record) => (
        <StatusTag status={record.Status} content={record.Status} />
      ),
      filters: EmailStatusFilters,
      filterSearch: true,
      filterMode: "tree",
      onFilter: (value, record) => record.Status === value,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 200,
      sorter: (a, b) => a.Description.localeCompare(b.Description),
    },
    {
      title: "Categories",
      dataIndex: "Type",
      key: "Type",
      filters: EmailCategoryFilters,
      filterSearch: true,
      filterMode: "tree",
      onFilter: (value, record) => record.Type === value,
      render: (_value, record) => (
        <StatusTag content={record?.Type} status={record?.Type} />
      ),
    },
    {
      title: "Apply to",
      dataIndex: "ApplyTo",
      key: "ApplyTo",
      filters: ReceiverTypeFilters,
      filterSearch: true,
      filterMode: "tree",
      onFilter: (value, record) => record.ApplyTo === value,
      render: (_value, record) => (
        <StatusTag status={record?.ApplyTo} content={record?.ApplyTo} />
      ),
    },
    {
      title: <ActionTitle />,
      key: "operation",
      width: 80,
      render: (_value, record) => (
        <div className="centered">
          <CustomDropdown
            id={record?.Id}
            viewLink={RouterEndpoints.EmailsManagement}
            editLink={`${RouterEndpoints.EmailsManagement}/edit`}
            isDeleteEmail
            handleDataChange={handleDataChange}
          />
        </div>
      ),
    },
  ];

  const onSelectChange = (selectedRowKey: React.Key[]) => {
    setSelectedRowKeys(selectedRowKey);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const scoresWithKeys = email.map((_email) => ({
    ..._email,
    key: _email.Id,
  }));

  const onChange: TableProps<IEmail>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    const dataStorage = extra.currentDataSource;
    storeDataToCache(dataStorage, "email");
  };

  return (
    <div
      style={{
        maxHeight: "70%",
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
      }}
      className="ant-table-container "
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

export default EmailTable;
