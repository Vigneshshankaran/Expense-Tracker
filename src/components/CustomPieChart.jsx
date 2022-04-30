import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function CustomPieChart({ chartData }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // sector color for each category
  const categoryColor = {
    Food: "#F66D44",
    Commute: "#FEAE65",
    Household: "#BC5090",
    Apparel: "#AADEA7",
    Health: "#64C2A6",
    Beauty: "#2D87BB",
    Education: "#58508D",
    Gift: "#FFA600",
    Other: " #FF6361",
    Salary: "#F66D44",
    Allowance: "#FEAE65",
    Business: "#64C2A6",
    Interest: "#2D87BB",
  };

  //function for customised pie chart label (copied from recharts documentation)
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        {/* <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.category}
        </text> */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >
          &#x20b9;{value}
        </text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={chartData}
          cx="50%"
          cy="40%"
          outerRadius="40%"
          fill="#12b02c"
          startAngle={90}
          endAngle={360 + 90}
          dataKey="amount"
          nameKey="category"
          minAngle={5}
          onMouseEnter={(_, index) => setActiveIndex(index)}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={categoryColor[entry.category]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            opacity: "75%",
            border: "none",
            borderRadius: "2px",
          }}
        />
        <Legend layout="horizontal" verticalAlign="bottom" />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;
