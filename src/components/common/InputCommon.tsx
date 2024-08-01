import React from "react";

export const InputCommon = ({
  InputPlaceHolderText,
  InputClass,
  InputEndIcon,
}: any) => {
  return (
    <div className=" relative">
      <input
        type="text"
        className={` bg-inputAuthBg/60   p-4 rounded-md text-grayLightBody w-full outline-none hover:outline-greenPrimary font-normal text-base mb-4 transition-all duration-300 ${InputClass} `}
        placeholder={InputPlaceHolderText}
      />
      <div className="absolute right-4 top-5 "> {InputEndIcon} </div>
      <span className="errorText text-red-400 text-xs"> </span>
    </div>
  );
};
