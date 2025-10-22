import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axiosInstance from "../utils/axios";
import { API_ENDPOINTS } from "../utils/api";
import Buttons from "../components/Buttons";
import ListItems from "../components/ListItems";
import AddItem from "../components/AddItem";
import BarChartCard from "../components/BarChart";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ amount: "", source: "", date: "" });

  const token = localStorage.getItem("token");

  const fetchIncomes = async () => {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.GET_ALL_INCOME, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIncomes(res.data.incomes);
      const formatted = res.data.incomes.map((item) => ({
        label: `${new Date(item.date).toLocaleDateString("en-GB")} (${item.source})`,
        amount: item.amount,
      }));
      setIncomeData(formatted);
    } catch (err) {
      console.error("Error fetching incomes:", err);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  // Add income
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(API_ENDPOINTS.ADD_INCOME, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowForm(false);
      setForm({ amount: "", source: "", date: "" });
      fetchIncomes();
    } catch (err) {
      console.error("Error adding income:", err);
    }
  };

  // Delete income
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_ENDPOINTS.DELETE_INCOME(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIncomes();
    } catch (err) {
      console.error("Error deleting income:", err);
    }
  };

  // Download Excel
  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.DOWNLOAD_INCOME, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
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
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Income Overview</h1>

        {/* Bar Chart */}
        <BarChartCard data={incomeData} labelKey="label" valueKey="amount" color="#22c55e" />

        {/* Action Buttons */}
        <Buttons
          onAdd={() => setShowForm(true)}
          onDownload={handleDownload}
          addLabel="+ Add Income"
          downloadLabel="⬇ Download Excel"
        />

        {/* Transaction History as Cards */}
        <ListItems
          transactions={incomes}
          onDelete={handleDelete}
          emptyMessage="No incomes found"
        />

        {/* Add Income Modal */}
        <AddItem
          show={showForm}
          onClose={() => {
            setShowForm(false);
            setForm({ amount: "", source: "", date: "" });
          }}
          onSubmit={handleSubmit}
          form={form}
          setForm={setForm}
          title="Add Income"
        />
      </main>
    </div>
  );
};

export default Income;
