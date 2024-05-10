import { PieChartDataProps } from "../../../interfaces/dashboard.interface";
import PercentChart from "../PercentChart/PercentChart";

const EmailChart = ({
  totalEmailTemplate,
  totalEmailReserve,
  totalEmailRemind,
  totalEmailNotice,
  totalEmailScore,
}: {
  totalEmailTemplate: number;
  totalEmailReserve: number;
  totalEmailRemind: number;
  totalEmailNotice: number;
  totalEmailScore: number;
}) => {
  const data: PieChartDataProps[] = [
    { name: "Reserve", value: totalEmailReserve },
    { name: "Remind", value: totalEmailRemind },
    { name: "Notice", value: totalEmailNotice },
    { name: "Score", value: totalEmailScore },
    {
      name: "Other",
      value:
        totalEmailTemplate -
        totalEmailReserve -
        totalEmailRemind -
        totalEmailNotice -
        totalEmailScore,
    },
  ];
  return (
    <div data-testid="email-chart">
      <PercentChart data={data} isResult={false} />
    </div>
  );
};

export default EmailChart;
