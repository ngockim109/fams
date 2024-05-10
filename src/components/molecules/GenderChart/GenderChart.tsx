import { PieChartDataProps } from "../../../interfaces/dashboard.interface";
import PercentChart from "../PercentChart/PercentChart";

const GenderChart = ({
  totalMale,
  totalStudent,
}: {
  totalMale: number;
  totalStudent: number;
}) => {
  const data: PieChartDataProps[] = [
    { name: "Male", value: totalMale },
    { name: "Female", value: totalStudent - totalMale },
  ];
  return (
    <PercentChart data={data} isResult={false} data-testid="percent-chart" />
  );
};

export default GenderChart;
