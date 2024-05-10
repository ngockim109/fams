import { PieChartDataProps } from "../../../interfaces/dashboard.interface";
import PercentChart from "../PercentChart/PercentChart";

const ResultChart = ({
  totalPass,
  totalFail,
}: {
  totalPass: number;
  totalFail: number;
}) => {
  const data: PieChartDataProps[] = [
    { name: "Pass", value: totalPass },
    { name: "Fail", value: totalFail },
  ];
  return <PercentChart data={data} isResult />;
};

export default ResultChart;
