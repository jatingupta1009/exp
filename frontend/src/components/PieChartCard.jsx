import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#10B981', '#EF4444', '#6366F1']; 

const PieChartCard = ({ title, data }) => {
  const chartData = [
    { name: 'Income', value: data?.totalIncome || 0 },
    { name: 'Expense', value: data?.totalExpense || 0 },
    { name: 'Balance', value: data?.totalBalance || 0 },
  ];

  const hasData = chartData.some(item => item.value > 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {hasData ? (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
              <Legend iconSize={10} />
            </PieChart>
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

export default PieChartCard;
