import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { IScore } from "../../../interfaces/score.interface";
import {
  getDataFromCache,
  storeDataToCache,
} from "../../../utils/StoreDataToCache";
import { exportScoreToExcel } from "../../../utils/ExportToExcel";
import ScoreColumns from "../../organisms/ScoreColumn/ScoreColumn";

interface ScoresTableProps {
  scores: IScore[];
  loading: boolean;
  isExport: boolean;
  completedExport: () => void;
  classId: string;
}

const ScoresTable: React.FC<ScoresTableProps> = ({
  scores,
  loading,
  isExport,
  completedExport,
  classId,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<IScore[]>([]);
  console.log(scores);

  const scoresWithKeys = scores.map((score, index) => ({
    ...score,
    key: index,
  }));
  const onChange: TableProps<IScore>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    const dataStorage = extra.currentDataSource;
    storeDataToCache(dataStorage, "score");
  };
  const onSelectChange = (
    selectedRowKey: React.Key[],
    selectedRow: IScore[]
  ) => {
    setSelectedRowKeys(selectedRowKey);
    setSelectedRows(selectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const scoreColumns: TableColumnsType<IScore> = ScoreColumns(
    scores,
    false,
    classId
  );

  const handleExport = () => {
    const dataCache = getDataFromCache("score") as IScore[];
    const dataExport =
      selectedRowKeys.length > 0 ? selectedRows : dataCache || scoresWithKeys;
    exportScoreToExcel(scoreColumns, dataExport);
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
        onChange={onChange}
        columns={scoreColumns}
        dataSource={scoresWithKeys}
        bordered
        rowSelection={rowSelection}
        size="middle"
        scroll={{ x: "max-content" }}
        style={{ flex: 1, overflowY: "auto" }}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "50", "100"],
          total: scoresWithKeys.length,
          showSizeChanger: true,
        }}
        loading={loading}
      />
    </div>
  );
};

export default ScoresTable;
