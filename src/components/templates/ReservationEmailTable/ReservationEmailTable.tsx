import React from "react";
import { Table, TableColumnsType } from "antd";
import dayjs from "dayjs";
import { IActivityLog } from "../../../interfaces/activity-log.interface";

interface ReservationEmailTableProps {
  activityLogs: IActivityLog[];
  loading: boolean;
}

const ReservationEmailTable: React.FC<ReservationEmailTableProps> = ({
  activityLogs,
  loading,
}) => {
  const columns: TableColumnsType<IActivityLog> = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
      fixed: "left",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Send Date",
      dataIndex: "SendDate",
      key: "SendDate",
      // sorter: (a, b) => a.SendDate.getTime() - b.SendDate.getTime(),
      render: (_value: unknown, record: IActivityLog) =>
        dayjs(record.SendDate).format("DD/MM/YYYY hh:mm:ss"),
    },
    {
      title: "Email Type",
      dataIndex: "EmailType",
      key: "EmailType",
      render: (_value, record) => record.EmailType,
    },
    {
      title: "Email Content",
      dataIndex: "EmailContent",
      key: "EmailContent",
      render: (_value, record) =>
        `Send ${record.EmailType} email to ${record.Receiver}`,
    },
  ];
  const scoresWithKeys = activityLogs.map((record, index) => ({
    ...record,
    key: index + 1,
  }));
  return (
    <div className="ant-table-container">
      <Table
        columns={columns}
        dataSource={scoresWithKeys}
        loading={loading}
        bordered
      />
    </div>
  );
};

export default ReservationEmailTable;
