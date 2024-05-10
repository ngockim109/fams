import { Dropdown, type MenuProps } from "antd";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IDashboard, YearData } from "../../../interfaces/dashboard.interface";
import Sizes from "../../../constants/Sizes";
import "./StudentChart.scss";

interface DataChart {
  Time: string;
  Incoming: number;
  Graduated: number;
}

const StudentChart = ({ dashboard }: { dashboard: IDashboard }) => {
  const YEARS = [2021, 2022, 2023];
  const [yearChart, setYearChart] = useState<number>(2022);
  const [dataChart, setDataChart] = useState<DataChart[]>([]);
  useEffect(() => {
    const incomingStudents = dashboard.IncomingStudents.find(
      (item) => item.Year === yearChart
    ) as YearData;
    const graduatedStudents = dashboard.GraduatedStudents.find(
      (item) => item.Year === yearChart
    ) as YearData;
    const data = incomingStudents?.SemesterData.map((item, index) => ({
      Time: item.Time,
      Incoming: item.Quantity,
      Graduated: graduatedStudents.SemesterData[index].Quantity,
    }));
    setDataChart(data);
  }, [yearChart]);
  const items: MenuProps["items"] = YEARS.map((year) => ({
    key: year,
    label: year,
  }));
  const handleClick: MenuProps["onClick"] = (e) => {
    setYearChart(Number(e.keyPath[0]));
  };

  return (
    <div className="wrapper-student">
      <div className="title-header">Incoming & Graduated Student</div>
      <div className="centered">
        <Dropdown menu={{ items, onClick: handleClick }} trigger={["click"]}>
          <div className="title-time-student-chart centered">
            Data for {yearChart}
            <span>
              <FaAngleDown size={Sizes.Medium} />
            </span>
          </div>
        </Dropdown>
      </div>
      <div className="student-chart">
        <BarChart
          width={500}
          height={300}
          data={dataChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Incoming" fill="#8884d8" />
          <Bar dataKey="Graduated" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default StudentChart;
