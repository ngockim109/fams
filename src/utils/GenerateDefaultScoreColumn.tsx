import { TableColumnsType } from "antd";
import { IScore } from "../interfaces/score.interface";
import { IStudentScore } from "../interfaces/student-score.interface";
import { handleStringShown } from "./HandleDataShown";

const generateDefaultScoreColumn = (
  isStudentScore: boolean
): TableColumnsType<IScore> | TableColumnsType<IStudentScore> => {
  const columns: TableColumnsType<IScore> = [
    {
      title: "Student ID",
      dataIndex: "StudentId",
      key: "StudentId",
      width: 170,
      fixed: "left",
      sorter: (a: IScore, b: IScore) => a.StudentId.localeCompare(b.StudentId),
    },
  ];
  const studentNameColumns: TableColumnsType<IStudentScore> = [
    {
      title: "Class ID",
      dataIndex: "ClassId",
      key: "ClassId",
      width: 170,
      sorter: (a: IStudentScore, b: IStudentScore) => {
        const aClass = a.ClassId || "";
        const bClass = b.ClassId || "";
        return aClass.localeCompare(bClass);
      },
      render: (_value: IStudentScore, record: IStudentScore) =>
        handleStringShown(record?.ClassId ?? ""),
    },
  ];
  return isStudentScore ? studentNameColumns : columns;
};

export default generateDefaultScoreColumn;
