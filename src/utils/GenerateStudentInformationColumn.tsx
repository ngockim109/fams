import { TableColumnsType } from "antd";
import { IScore } from "../interfaces/score.interface";
import { handleStringShown } from "./HandleDataShown";
import { IStudentScore } from "../interfaces/student-score.interface";

const generateStudentInformationColumn = (
  isStudentScore: boolean
): TableColumnsType<IScore> | TableColumnsType<IStudentScore> => {
  const columns: TableColumnsType<IScore> = [
    {
      title: "Student Name",
      dataIndex: "StudentName",
      key: "StudentName",
      fixed: "left",
      width: 170,
      sorter: (a: IScore, b: IScore) => {
        const aStudentName = a.Scores[0].StudentName || "";
        const bStudentName = b.Scores[0].StudentName || "";
        return aStudentName.localeCompare(bStudentName);
      },
      render: (_value: IScore, record: IScore) =>
        handleStringShown(record.Scores[0]?.StudentName ?? ""),
    },
  ];
  return isStudentScore ? [] : columns;
};

export default generateStudentInformationColumn;
