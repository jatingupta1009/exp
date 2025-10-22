import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, TrendingUp, TrendingDown, LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="bg-white/90 backdrop-blur-md w-64 p-6 flex flex-col justify-between h-screen sticky top-0 shadow-2xl rounded-r-2xl">
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-rose-500">Expense Tracker</h1>
          <div className="flex items-center gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-sm">Welcome Back</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 bg-rose-400 text-white p-3 rounded-xl font-semibold hover:bg-rose-500 transition duration-300"
          >
            <PieChart size={20} /> Dashboard
          </Link>
          <Link
            to="/income"
            className="flex items-center gap-3 text-gray-600 p-3 rounded-xl font-semibold hover:bg-rose-50 transition-colors"
          >
            <TrendingUp size={20} /> Income
          </Link>
          <Link
            to="/expense"
            className="flex items-center gap-3 text-gray-600 p-3 rounded-xl font-semibold hover:bg-rose-50 transition-colors"
          >
            <TrendingDown size={20} /> Expense
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-gray-600 p-3 rounded-xl font-semibold hover:bg-rose-50 transition-colors"
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
