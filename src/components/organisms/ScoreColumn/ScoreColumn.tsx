/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableColumnsType } from "antd";
import { IScore } from "../../../interfaces/score.interface";
import { IStudentScore } from "../../../interfaces/student-score.interface";
import generateScoreColumn from "../../../utils/GenerateScoreColumn";
import generateStudentInformationColumn from "../../../utils/GenerateStudentInformationColumn";
import generateDefaultScoreColumn from "../../../utils/GenerateDefaultScoreColumn";
import generateLastScoreColumn from "../../../utils/GenerateLastScoreColumn";

const ScoreColumns = (
  data: IScore[] | IStudentScore[],
  isStudentScore?: boolean,
  classId?: string
): TableColumnsType<any> => {
  console.log(data);
  const view = generateStudentInformationColumn(isStudentScore ?? false);
  const utils = generateScoreColumn(data[0]?.Scores);
  const actionColumns = generateLastScoreColumn(
    classId ?? "",
    isStudentScore ?? false
  );
  const defaultColumns = generateDefaultScoreColumn(isStudentScore ?? false);

  return [...defaultColumns, ...view, ...utils, ...actionColumns];
};

export default ScoreColumns;
