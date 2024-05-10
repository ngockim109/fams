import { TableColumnsType } from "antd";
import { IScore } from "../interfaces/score.interface";
import { IStudentScore } from "../interfaces/student-score.interface";
import { handleNumberShown } from "./HandleDataShown";
import CustomDropdown from "../components/molecules/CustomDropdown/CustomDropdown";
import ActionTitle from "../components/atoms/ActionTitle/ActionTitle";
import RouterEndpoints from "../constants/RouterEndpoints";

const generateLastScoreColumn = (
  classId: string,
  isStudentScore: boolean
): TableColumnsType<IScore> | TableColumnsType<IStudentScore> => {
  const actionColumns: TableColumnsType<IScore> = [
    {
      title: "GPA",
      dataIndex: "GPA",
      key: "GPA",
      width: 100,
      fixed: "left",
      sorter: (a: IScore, b: IScore) => a.GPA - b.GPA,
      render: (_value: number, record: IScore) => handleNumberShown(record.GPA),
    },
    {
      title: <ActionTitle />,
      dataIndex: "Action",
      key: "Action",
      width: 60,
      render: (_value: string, record: IScore) => (
        <div className="centered">
          {classId && (
            <CustomDropdown
              id={record?.StudentId}
              viewLink={`${RouterEndpoints.ClassesManagement}/${classId}/student-management`}
              editLink={`${RouterEndpoints.ClassesManagement}/${classId}/scores/edit`}
              handleDataChange={() => {}}
            />
          )}
        </div>
      ),
    },
  ];
  const studentActionColumns: TableColumnsType<IStudentScore> = [
    {
      title: <ActionTitle />,
      dataIndex: "Action",
      key: "Action",
      width: 60,
      render: (_value: string, record: IStudentScore) => (
        <div className="centered">
          {isStudentScore && (
            <CustomDropdown
              id={record?.StudentId}
              viewLink={`${RouterEndpoints.ClassesManagement}/${record?.ClassId}/student-management`}
              editLink={`${RouterEndpoints.ClassesManagement}/${record?.ClassId}/scores/edit`}
              handleDataChange={() => {}}
            />
          )}
        </div>
      ),
    },
  ];
  return isStudentScore ? studentActionColumns : actionColumns;
};
export default generateLastScoreColumn;
