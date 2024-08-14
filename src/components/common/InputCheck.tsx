import React from "react";

export const InputCheck = () => {
  return (
    <div className="flex items-start  ">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          value=""
          className="w-4 h-4 border border-gray-300 rounded bg-gray-50  accent-greenPrimary   "
          required
        />
      </div>
      <label className="ms-2 text-sm font-medium text-gray-900  "></label>
    </div>
  );
};
