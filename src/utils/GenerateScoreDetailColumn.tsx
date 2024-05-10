import { TableColumnsType, Form, Input } from "antd";
import { IModuleAssignmentScore } from "../interfaces/module-assignment-score.interface";
import { getCourseStatus } from "./GenerateStatus";
import { handleNumberShown } from "./HandleDataShown";
import StatusTag from "../components/atoms/StatusTag/StatusTag";
import rules from "./ScoreValidation";

const generateScoreDetailColumn = (
  studentScore: IModuleAssignmentScore,
  isEdit?: boolean
): TableColumnsType<IModuleAssignmentScore> => {
  console.log(isEdit);
  const columns: TableColumnsType<IModuleAssignmentScore> =
    studentScore?.AssignmentScore.map((score) => ({
      title: score.AssignmentName,
      dataIndex: score.ScoreValue,
      key: `${score.AssignmentName}_${studentScore.Email}_${score.ScoreValue}`,
      width: isEdit ? 100 : 170,
      render: (
        _value: IModuleAssignmentScore,
        record: IModuleAssignmentScore
      ) => {
        const foundAssignment = record?.AssignmentScore?.find(
          (ass) =>
            ass.AssignmentName === score.AssignmentName &&
            ass.AssignmentName.includes("Status")
        );
        const scoreRecord = record?.AssignmentScore?.find(
          (ass) =>
            ass.AssignmentName === score.AssignmentName &&
            !ass.AssignmentName.includes("Status")
        );

        if (foundAssignment) {
          // If it's a status, render StatusTag
          return (
            <StatusTag
              status={isEdit ? -1 : foundAssignment.ScoreValue}
              content={getCourseStatus(
                isEdit ? -1 : foundAssignment.ScoreValue
              )}
            />
          );
        }
        // If it's not a status, render using handleNumberShown()
        if (isEdit) {
          if (!scoreRecord?.AssignmentName.includes("Avg")) {
            return (
              <Form.Item
                name={scoreRecord?.AssignmentName}
                initialValue={scoreRecord?.ScoreValue}
                rules={rules}
                style={{ width: "100px" }}
              >
                <Input type="number" step={0.1} />
              </Form.Item>
            );
          }
          return (
            <Form.Item
              name={scoreRecord?.AssignmentName}
              initialValue={scoreRecord?.ScoreValue}
              rules={rules}
              style={{ width: "100px" }}
            >
              <Input type="number" step={0.1} disabled />
            </Form.Item>
          );
        }
        return handleNumberShown(scoreRecord?.ScoreValue ?? -1);
      },
    }));
  return columns;
};

export default generateScoreDetailColumn;
