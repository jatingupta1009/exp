import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../utils/axios";
import { API_ENDPOINTS } from "../utils/api";
import SummaryCard from "../components/SummaryCard";
import HistoryCard from "../components/HistoryCard";
import PieChartCard from "../components/PieChartCard";
import LineChartCard from "../components/LineChartCard";

const Home = () => {
  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
    last30DaysExpenses: {
      transactions: [],
      total: 0,
    },
    last60DaysIncome: {
      transactions: [],
      total: 0,
    },
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(API_ENDPOINTS.GET_DATA, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboard({
          totalIncome: res.data.totalIncome,
          totalExpense: res.data.totalExpense,
          totalBalance: res.data.totalBalance,
          last30DaysExpenses: res.data.last30DaysExpenses,
          last60DaysIncome: res.data.last60DaysIncome,
          recentTransactions: res.data.recentTransactions,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="p-8 flex-1 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SummaryCard label="Total Balance" value={dashboard.totalBalance} color="violet-500" />
          <SummaryCard label="Total Income" value={dashboard.totalIncome} color="orange-500" />
          <SummaryCard label="Total Expense" value={dashboard.totalExpense} color="red-500" />
        </div>

        {/* Charts and History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Recent Transactions */}
          <HistoryCard title="Recent Transactions" transactions={dashboard.recentTransactions} />
          <PieChartCard title="Finance Overview" data={dashboard} />

          {/* Last 60 Days Income */}
          <HistoryCard
            title="Last 60 Days Income"
            transactions={dashboard.last60DaysIncome.transactions.map(t => ({ ...t, type: 'income' }))}
          />
          <LineChartCard
            title="Income Trend (Last 60 Days)"
            data={dashboard.last60DaysIncome.transactions}
            color="#10B981"
            label="Income"
          />

          {/* Last 30 Days Expense */}
          <HistoryCard
            title="Last 30 Days Expense"
            transactions={dashboard.last30DaysExpenses.transactions.map(t => ({ ...t, type: 'expense' }))}
          />
          <LineChartCard
            title="Expense Trend (Last 30 Days)"
            data={dashboard.last30DaysExpenses.transactions}
            color="#EF4444"
            label="Expense"
          />

        </div>
      </main>
    </div>
  );
};

export default Home;
