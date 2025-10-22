import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../utils/axios";
import { API_ENDPOINTS } from "../utils/api";
import Buttons from "../components/Buttons";
import ListItems from "../components/ListItems";
import AddItem from "../components/AddItem";
import BarChartCard from "../components/BarChart";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ amount: "", category: "", date: "" });

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.GET_ALL_EXPENSE, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses(res.data.expenses);
      const formatted = res.data.expenses.map((item) => ({
        label: `${new Date(item.date).toLocaleDateString("en-GB")} (${item.category})`,
        amount: item.amount,
      }));
      setExpenseData(formatted);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add expense
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(API_ENDPOINTS.ADD_EXPENSE, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowForm(false);
      setForm({ amount: "", category: "", date: "" });
      fetchExpenses();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_ENDPOINTS.DELETE_EXPENSE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  // Download Excel
  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.DOWNLOAD_EXPENSE, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error downloading excel:", err);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="p-8 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Expense Overview</h1>

        {/* Bar Chart */}
        <BarChartCard data={expenseData} labelKey="label" valueKey="amount" color="#EF4444" />

        {/* Action Buttons */}
        <Buttons
          onAdd={() => setShowForm(true)}
          onDownload={handleDownload}
          addLabel="+ Add Expense"
          downloadLabel="⬇ Download Excel"
        />

        {/* Transaction History */}
        <ListItems
          transactions={expenses}
          onDelete={handleDelete}
          emptyMessage="No expenses found"
        />

        {/* Add Expense Modal */}
        <AddItem
          show={showForm}
          onClose={() => {
            setShowForm(false);
            setForm({ amount: "", category: "", date: "" });
          }}
          onSubmit={handleSubmit}
          form={form}
          setForm={setForm}
          title="Add Expense"
        />
      </main>
    </div>
  );
};

export default Expense;
