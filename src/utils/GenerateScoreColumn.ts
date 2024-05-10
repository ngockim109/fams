import { TableColumnsType } from "antd";
import generateScoreChildrenColumn from "./GenerateScoreChildrenColumn";
import { IModuleAssignmentScore } from "../interfaces/module-assignment-score.interface";

const generateScoreColumn = (
  scores: IModuleAssignmentScore[]
): TableColumnsType<IModuleAssignmentScore> => {
  console.log(scores);

  if (!Array.isArray(scores)) {
    return [];
  }

  const columns: TableColumnsType<IModuleAssignmentScore> = scores.flatMap(
    (studentScore) => ({
      title: studentScore?.ModuleName,
      children: generateScoreChildrenColumn(studentScore),
    })
  );
  return columns;
};

export default generateScoreColumn;
