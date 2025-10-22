import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartCard = ({ data = [], labelKey, valueKey, color }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey={labelKey} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => new Intl.NumberFormat().format(value)}
            contentStyle={{ borderRadius: "8px" }}
          />
          <Bar
            dataKey={valueKey}
            fill={color}
            radius={[6, 6, 0, 0]} 
            barSize={40} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
