import React from "react";

const ProgressBar = ({ Progress, LabelName }: any) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <div className="flex justify-between gap-1 w-full text-base font-medium">
        <label htmlFor="">{LabelName}</label>
        <div>{Progress}%</div>
      </div>
      <div className="w-full bg-[#E4E8EF] rounded-full h-2.5  ">
        <div
          className="bg-greenPrimary h-2.5 rounded-full"
          style={{ width: `${Progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
