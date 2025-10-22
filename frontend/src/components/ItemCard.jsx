import React from "react";

const ItemCard = ({ transaction, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
      <div>
        <p className="text-gray-500 text-sm">
          {new Date(transaction.date).toLocaleDateString("en-GB")}
        </p>
        <h3 className="text-lg font-semibold">{transaction.source}</h3>
        <p className="text-green-600 font-bold text-xl">₹{transaction.amount}</p>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
