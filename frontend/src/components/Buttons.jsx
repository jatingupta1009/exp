import React from "react";

const Buttons = ({ onAdd, onDownload, addLabel, downloadLabel }) => {
  return (
    <div className="flex justify-between items-center mt-8 mb-4">
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
      >
        {addLabel}
      </button>
      <button
        onClick={onDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        {downloadLabel}
      </button>
    </div>
  );
};

export default Buttons;
