import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const HistoryCard = ({ title, transactions = [] }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-4/5">
            <p className="text-gray-500">No transactions to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <a href="#" className="text-sm font-semibold text-violet-600 hover:underline">See All</a>
      </div>
      <ul className="space-y-4">
        {transactions.map((item) => {
          const isIncome = item.type === 'income';
          return (
            <li key={item._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {isIncome ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{item.title || item.category}</p>
                  <p className="text-xs text-gray-500">{formatDate(item.date)}</p>
                </div>
              </div>
              <p className={`font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                {isIncome ? '+' : '-'} {formatCurrency(item.amount)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HistoryCard;

