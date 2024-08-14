import React from "react";

export const TextArea = ({ textareaLabel }: any) => {
  return (
    <div className="mb-2">
      <label className="pb-1 block"> {textareaLabel} </label>
      <textarea
        className="bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary  focus:outline-greenPrimary font-normal text-base mb-1 transition-all duration-300"
        rows={4}
      ></textarea>
    </div>
  );
};
