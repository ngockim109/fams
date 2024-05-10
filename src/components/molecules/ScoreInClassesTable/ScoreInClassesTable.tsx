import { Table, Spin } from "antd";
import ScoreColumns from "../../organisms/ScoreColumn/ScoreColumn";
import { IStudentScore } from "../../../interfaces/student-score.interface";

interface ScoreInClassesTableProps {
  scores: IStudentScore[];
  loading: boolean;
}
const ScoreInClassesTable = ({ scores, loading }: ScoreInClassesTableProps) => {
  const columns = ScoreColumns(scores, true);

  const scoresWithKeys = scores.map((student) => ({
    ...student,
    key: `${student?.StudentId}_${student?.ClassId}`,
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
      {loading ? ( // Render loading spinner if loading is true
        <div data-testid="loading-spinner" className="spin-container">
          <Spin />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={scoresWithKeys}
          bordered
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
      )}
    </div>
  );
};

export default ScoreInClassesTable;
