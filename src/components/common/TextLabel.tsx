import React from "react";

export const TextLabel = ({
  TextClass,
  TextPlaceHolder,
  TextEndIcon,
  TextLabelName,
}) => {
  return (
    <div className=" relative mb-2">
      <label className="pb-1 block">{TextLabelName}</label>
      <input
        type="text"
        className={` bg-inputAuthBg/60   p-3 rounded-md text-grayLightBody w-full outline-none focus:outline-none font-normal text-base mb-2 transition-all duration-300 ${TextClass} `}
        placeholder={TextPlaceHolder}
      />
      <div className="absolute right-4 top-10 "> {TextEndIcon} </div>
      <span className="errorText text-red-400 text-xs"> </span>
    </div>
  );
};
