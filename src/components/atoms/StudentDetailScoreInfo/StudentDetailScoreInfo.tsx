import React from "react";
import "./StudentDetailScoreInfo.scss";
import { Card, Space, Table } from "antd";
import "../../../styles/main.scss";
import StatusTag from "../StatusTag/StatusTag";
import { getCourseStatus } from "../../../utils/GenerateStatus";
import { IModuleAssignmentScore } from "../../../interfaces/module-assignment-score.interface";
import generateScoreDetailColumn from "../../../utils/GenerateScoreDetailColumn";

interface StudentDetailScoreInfoProps {
  studentScore: IModuleAssignmentScore[] | null;
  className: string;
  classId: string;
  isEdit?: boolean;
}

const StudentDetailScoreInfo: React.FC<StudentDetailScoreInfoProps> = ({
  studentScore,
  className,
  classId,
  isEdit,
}) => {
  if (!studentScore) {
    return null;
  }

  // Initialize empty arrays for different ModuleType
  const feeScores: IModuleAssignmentScore[] = [];
  const mockScores: IModuleAssignmentScore[] = [];

  // Iterate through the data array
  studentScore?.forEach((score) => {
    // Destructure the score
    const { ModuleType } = score;

    // Push score to corresponding array based on ModuleType
    if (ModuleType === "1") {
      feeScores.push(score);
    } else if (ModuleType === "2") {
      mockScores.push(score);
    }
  });
  const finalStatus =
    feeScores
      .find(
        (feeItem) =>
          feeItem.AssignmentScore.find(
            (ass) => ass.AssignmentName === "Final Status"
          )?.ScoreValue
      )
      ?.AssignmentScore.find((ass) => ass.AssignmentName === "Final Status")
      ?.ScoreValue || -1;
  const mockStatus =
    mockScores
      .find(
        (mockItem) =>
          mockItem.AssignmentScore.find(
            (ass) => ass.AssignmentName === "Mock Status"
          )?.ScoreValue
      )
      ?.AssignmentScore.find((ass) => ass.AssignmentName === "Mock Status")
      ?.ScoreValue ??
    mockScores[0]?.AssignmentScore.find(
      (ass) => ass.AssignmentName === "Mock Status"
    )?.ScoreValue ??
    -1;

  return (
    <div className="score-table-container">
      {/* Basic Information */}
      <Space className="class-code" direction="vertical">
        <div className="headingh5 student-class">{className}</div>
        <div className="subtitle1-bold class-code">{classId}</div>
      </Space>
      <hr className="class-code-divider" />
      {/* Score Tables */}
      <div className="score-tables">
        {/* Fee Tables */}
        <div>
          <div className="table-status">
            <div className="subtitle1-bold table-status-name">FEE</div>
            <StatusTag
              status={finalStatus}
              content={getCourseStatus(finalStatus)}
            />
          </div>
          <div className="fee-tables">
            {feeScores.map((feeScore) => (
              <div className="table-in-fee" key={feeScore.ModuleName}>
                <Card className="quiz-table">
                  <div className="ant-card-head">{feeScore.ModuleName}</div>
                  <div className="table-data">
                    <Table
                      dataSource={Array({
                        ...feeScore,
                        key: `${feeScore.ModuleName}_${feeScore.Email}_${feeScore.ModuleType}`,
                      })}
                      columns={
                        isEdit
                          ? generateScoreDetailColumn(feeScore, isEdit)
                          : generateScoreDetailColumn(feeScore)
                      }
                      pagination={false}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        {/* Mock Table */}
        <div>
          <div className="table-status">
            <div className="subtitle1-bold table-status-name">MOCK</div>
            <StatusTag
              status={mockStatus}
              content={getCourseStatus(mockStatus)}
            />
          </div>
          <div className="mock-table">
            {mockScores.map((mockScore) => (
              <div className="table-in-mock" key={mockScore.ModuleName}>
                <Card className="quiz-table">
                  <div className="ant-card-head">{mockScore.ModuleName}</div>
                  <div className="table-data">
                    <Table
                      dataSource={Array({
                        ...mockScore,
                        key: `${mockScore.ModuleName}_${mockScore.Email}_${mockScore.ModuleType}`,
                      })}
                      columns={
                        isEdit
                          ? generateScoreDetailColumn(mockScore, isEdit)
                          : generateScoreDetailColumn(mockScore)
                      }
                      pagination={false}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

StudentDetailScoreInfo.defaultProps = {
  isEdit: false,
};

export default StudentDetailScoreInfo;
