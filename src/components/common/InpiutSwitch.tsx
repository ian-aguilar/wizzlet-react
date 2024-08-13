import React from "react";

export const InpiutSwitch = () => {
  return (
    <div>
      <label
        for="toggle2"
        className="flex items-center cursor-pointer   dark:text-grayLightBody"
      >
        <div className="relative">
          <input type="checkbox" id="toggle2" className="peer sr-only" />
          <div className="block h-5 rounded-full dark:bg-dark-2 bg-grayLightBody/20 w-8"></div>
          <div className="absolute w-3 h-3 transition bg-grayText/30 rounded-full dot  left-1 top-1 peer-checked:translate-x-full peer-checked:bg-greenPrimary  "></div>
        </div>
      </label>
    </div>
  );
};
