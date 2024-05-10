import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import CustomDropdown from "../../molecules/CustomDropdown/CustomDropdown";
import { IClass } from "../../../interfaces/class.interface";
import StatusTag from "../../atoms/StatusTag/StatusTag";
import ActionTitle from "../../atoms/ActionTitle/ActionTitle";
import RouterEndpoints from "../../../constants/RouterEndpoints";
import { ClassStatusFilters } from "../../../constants/TableFilters";

interface ClassTableProps {
  classes: IClass[];
  loading: boolean;
}

const ClassTable: React.FC<ClassTableProps> = ({ classes, loading }) => {
  const columns: TableColumnsType<IClass> = [
    {
      title: "Class ID",
      dataIndex: "Id",
      key: "Id",
      fixed: "left",
      sorter: (a, b) => a.Id.localeCompare(b.Id),
    },
    {
      title: "Class Name",
      dataIndex: "ClassName",
      key: "ClassName",
      fixed: "left",
      sorter: (a, b) => a.ClassName.localeCompare(b.ClassName),
    },
    {
      title: "Created on",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
      sorter: (a, b) =>
        a.CreatedDate.toString().localeCompare(b.CreatedDate.toString()),
    },

    {
      title: "Created by",
      dataIndex: "CreatedBy",
      key: "CreatedBy",
      sorter: (a, b) => a.CreatedBy.localeCompare(b.CreatedBy),
    },
    {
      title: "Duration",
      dataIndex: "Duration",
      key: "Duration",
      sorter: (a, b) => a.Duration - b.Duration,
    },
    {
      title: "Status",
      dataIndex: "StatusClass",
      key: "StatusClass",
      width: 90,
      filters: ClassStatusFilters,
      filterSearch: true,
      filterMode: "tree",
      onFilter: (value, record) => record.StatusClass === value,
      render: (_value, record) => (
        <StatusTag status={record.StatusClass} content={record.StatusClass} />
      ),
    },
    {
      title: "Location",
      dataIndex: "Location",
      key: "Location",
      sorter: (a, b) => a.Location.localeCompare(b.Location),
    },
    {
      title: <ActionTitle />,
      key: "operation",
      width: 80,
      render: (_value, record) => (
        <div className="centered">
          <CustomDropdown
            id={record?.Id}
            viewLink={RouterEndpoints.ClassesManagement}
            textView="View"
            isEdit={false}
            handleDataChange={() => {}}
          />
        </div>
      ),
    },
  ];

  const scoresWithKeys = classes.map((_class) => ({
    ..._class,
    key: _class.Id,
  }));

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
        loading={loading}
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

export default ClassTable;
