import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { PieChartDataProps } from "../../../interfaces/dashboard.interface";
import "./PercentChart.scss";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#CC8021"];
const COLORS_RESULT = ["#00C49F", "#dc4e4e"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  // index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  // index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PercentChart = ({
  data,
  isResult,
}: {
  data: PieChartDataProps[];
  isResult: boolean;
}) => {
  const COLORS_CHOOSE = isResult ? COLORS_RESULT : COLORS;
  return (
    <div className="wrapper-chart" data-testid="percent-chart">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((_entry, index) => (
            <Cell
              key={Math.random()}
              fill={COLORS_CHOOSE[index % COLORS_CHOOSE.length]}
            />
          ))}
        </Pie>
        <Tooltip formatter={(name, value) => [`${name}`, `${value}`]} />
      </PieChart>
      <div className="note-class ">
        {data.map((item, index) => (
          <div className="note-item" key={item.name}>
            <div
              className="note-color"
              style={{ backgroundColor: COLORS_CHOOSE[index] }}
            />
            <div className="value-note">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PercentChart;
