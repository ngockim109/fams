import { PieChartDataProps } from "../../../interfaces/dashboard.interface";
import PercentChart from "../PercentChart/PercentChart";

const StatusStudentChart = ({
  totalStudent,
  totalStudentReserve,
  totalStudentDropOut,
  totalStudentFinished,
}: {
  totalStudent: number;
  totalStudentReserve: number;
  totalStudentDropOut: number;
  totalStudentFinished: number;
}) => {
  const data: PieChartDataProps[] = [
    {
      name: "In class",
      value:
        totalStudent -
        totalStudentReserve -
        totalStudentDropOut -
        totalStudentFinished,
    },
    { name: "Reserve", value: totalStudentReserve },
    { name: "Drop out", value: totalStudentDropOut },
    { name: "Finished", value: totalStudentFinished },
  ];
  return <PercentChart data={data} isResult={false} />;
};

export default StatusStudentChart;
