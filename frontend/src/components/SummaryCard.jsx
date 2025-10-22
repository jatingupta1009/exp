import React from "react";
import { CreditCard } from "lucide-react";

const SummaryCard = ({ label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-5 w-full max-w-sm">
      <div className={`p-3 rounded-xl bg-${color} text-white`}>
        <CreditCard size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-gray-800 font-bold text-xl">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
