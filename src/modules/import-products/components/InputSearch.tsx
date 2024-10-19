import React, { useState, useEffect } from "react";
import { ISearchBox } from "../types";

const InputSearch = ({
  value,
  placeholder,
  className,
  InputLeftIcon,
  onChange,
}: ISearchBox) => {
  const [searchTerm, setSearchTerm] = useState(value || "");

  // Debounce effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChange(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute left-4 top-3">{InputLeftIcon}</div>
      <div>
        <input
          onChange={handleChange}
          value={searchTerm}
          type="text"
          className={`bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary focus:outline-greenPrimary font-normal text-base mb-1 transition-all duration-300 ${className}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputSearch;
