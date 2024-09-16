// ** Packages **
import Select, { StylesConfig } from "react-select";
import { ISelectCategoryProps } from "../types";
const customStyles: StylesConfig = {};
export const SelectMarketplace = ({
  dropdownClass,
  placeholder,
  value,
  options,
  isSearchable,
  onChange,
  StylesConfig,
}: ISelectCategoryProps) => {
  const customStyles: StylesConfig = {
    ...StylesConfig,
    menu: (provided) => ({
      ...provided,
      zIndex: 99,
    }),
  };
  return (
    <Select
      styles={customStyles}
      options={options}
      isSearchable={isSearchable}
      value={value}
      placeholder={placeholder}
      className={dropdownClass}
      onChange={onChange}
    />
  );
};
