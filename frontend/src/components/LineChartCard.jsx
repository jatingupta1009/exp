import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const LineChartCard = ({ title, data, color = '#10B981', label = 'Value' }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {hasData ? (
            <LineChart
              data={data}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(str) =>
                  new Date(str).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                  })
                }
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value) => [`$${value.toFixed(2)}`, label]}
                labelFormatter={(label) =>
                  new Date(label).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                }
              />
              <Legend iconSize={10} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke={color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                name={label}
              />
            </LineChart>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Not enough data to display the chart.</p>
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;
