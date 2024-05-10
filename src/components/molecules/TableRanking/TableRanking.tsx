import { useEffect, useState } from "react";
import { Dropdown, Table, TableColumnsType } from "antd";
import type { MenuProps } from "antd";
import { FaAngleDown } from "react-icons/fa";
import { IDashboard, Person } from "../../../interfaces/dashboard.interface";
import "./TableRanking.scss";
import Sizes from "../../../constants/Sizes";

interface TableRankingProps {
  dashboard: IDashboard;
}
const TableRanking = ({ dashboard }: TableRankingProps) => {
  const [yearRanking, setYearRanking] = useState<number>(2022);
  const [semesterRanking, setSemesterRanking] = useState<string>("Semester 1");
  const YEARS = [2021, 2022, 2023];
  const SEMESTER = ["Semester 1", "Semester 2", "Semester 3"];
  const [data, setData] = useState<Person[]>([]);
  useEffect(() => {
    const tempYear = dashboard.StudentRanking.find(
      (item) => item.Year === yearRanking
    );
    const tempSemester = tempYear?.SemesterData.find(
      (item) => item.Time === semesterRanking
    );
    setData(tempSemester?.Data as Person[]);
  }, [yearRanking, semesterRanking]);
  const columns: TableColumnsType<Person> = [
    {
      title: "Rank",
      key: "Rank",
      render: (_, __, index) => index + 1,
    },
    {
      title: "ID",
      key: "ID",
      dataIndex: "ID",
    },
    { title: "Name", dataIndex: "Name", key: "Name" },
    { title: "GPA", dataIndex: "GPA", key: "GPA" },
  ];
  const dataWithKeys = data.map((_student) => ({
    ..._student,
    key: _student.ID,
  }));
  const items: MenuProps["items"] = YEARS.map((year) => ({
    key: year,
    label: year,
    children: SEMESTER.map((semester) => ({
      key: `${year}-${semester}`,
      label: semester,
    })),
  }));
  const handleClick: MenuProps["onClick"] = (e) => {
    const yearChoose = e.keyPath[1];
    const semesterChoose = e.keyPath[0].slice(5);

    setYearRanking(Number(yearChoose));
    setSemesterRanking(semesterChoose);
  };

  return (
    <div className="table-ranking ant-table-container">
      <div>
        <div className="title-header">Top 3 highest grades students</div>
        <div className="centered">
          <Dropdown menu={{ items, onClick: handleClick }} trigger={["click"]}>
            <div className="title-time-ranking centered">
              {yearRanking} - {semesterRanking}
              <span>
                <FaAngleDown size={Sizes.Medium} />
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
      <Table
        columns={columns}
        bordered
        dataSource={dataWithKeys}
        pagination={false}
      />
    </div>
  );
};

export default TableRanking;
