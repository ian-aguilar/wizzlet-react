import React from "react";

export const ButttonCommon = ({ BtnName }: any) => {
  return (
    <button className="text-white bg-greenPrimary hover:brightness-110 px-3 py-[10px] font-normal text-base w-full rounded   mt-9 transition-all duration-300">
      {BtnName}
    </button>
  );
};
