import React from "react";
import { InputSwitchProps } from "./types";

export const InputSwitch: React.FC<InputSwitchProps> = ({
  id,
  status,
  onToggle,
  className,
}) => {
  const handleToggle = () => {
    const newStatus = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    onToggle(id, newStatus);
  };

  return (
    <div className={` ${className} `}>
      <label
        htmlFor={`toggle-${id}`}
        className="flex items-center cursor-pointer dark:text-grayLightBody"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={`toggle-${id}`}
            className="peer sr-only"
            checked={status === "ACTIVE"}
            onChange={handleToggle}
          />
          <div className="block h-5 rounded-full dark:bg-dark-2 bg-grayLightBody/20 w-8"></div>
          <div className="absolute w-3 h-3 transition bg-grayText/30 rounded-full dot left-1 top-1 peer-checked:translate-x-full peer-checked:bg-greenPrimary"></div>
        </div>
      </label>
    </div>
  );
};
