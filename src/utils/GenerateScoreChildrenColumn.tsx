import { TableColumnsType } from "antd";
import { IModuleAssignmentScore } from "../interfaces/module-assignment-score.interface";
import { IScore } from "../interfaces/score.interface";
import { getCourseStatus } from "./GenerateStatus";
import { handleNumberShown } from "./HandleDataShown";
import StatusTag from "../components/atoms/StatusTag/StatusTag";

const generateScoreChildrenColumn = (
  studentScore: IModuleAssignmentScore
): TableColumnsType<IScore> => {
  const columns: TableColumnsType<IScore> = studentScore?.AssignmentScore.map(
    (score) => ({
      title: score.AssignmentName,
      dataIndex: score.ScoreValue,
      key: score.AssignmentName,
      width: 170,
      sorter: (a: IScore, b: IScore) => {
        const aScore =
          a?.Scores?.find(
            (item) => item.ModuleName === studentScore.ModuleName
          )?.AssignmentScore.find(
            (ass) => ass.AssignmentName === score.AssignmentName
          )?.ScoreValue ?? -1;
        const bScore =
          b?.Scores?.find(
            (item) => item.ModuleName === studentScore.ModuleName
          )?.AssignmentScore.find(
            (ass) => ass.AssignmentName === score.AssignmentName
          )?.ScoreValue ?? -1;
        return aScore - bScore;
      },
      render: (_value: IScore, record: IScore) => {
        const foundAssignment = record.Scores.find(
          (item) => item.ModuleName === studentScore.ModuleName
        )?.AssignmentScore.find(
          (ass) =>
            ass.AssignmentName === score.AssignmentName &&
            ass.AssignmentName.includes("Status")
        );

        if (foundAssignment) {
          // If it's a status, render StatusTag
          return (
            <StatusTag
              status={foundAssignment.ScoreValue}
              content={getCourseStatus(foundAssignment.ScoreValue)}
            />
          );
        }
        // If it's not a status, render using handleNumberShown()
        return handleNumberShown(
          record.Scores.find(
            (item) => item.ModuleName === studentScore.ModuleName
          )?.AssignmentScore.find(
            (ass) =>
              ass.AssignmentName === score.AssignmentName &&
              !ass.AssignmentName.includes("Status")
          )?.ScoreValue ?? -1
        );
      },
    })
  );
  return columns;
};

export default generateScoreChildrenColumn;
