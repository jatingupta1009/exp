import React from "react";
import ItemCard from "./ItemCard";

const ListItems = ({ transactions, onEdit, onDelete, emptyMessage }) => {
  if (!transactions || transactions.length === 0)
    return (
      <p className="col-span-full text-center text-gray-500 mt-4">{emptyMessage}</p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {transactions.map((item) => (
        <ItemCard
          key={item._id}
          transaction={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item._id)}
        />
      ))}
    </div>
  );
};

export default ListItems;
