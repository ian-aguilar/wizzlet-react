// ** Packages **
import Select, { StylesConfig } from "react-select";
import { ISelectCategoryProps } from "../types";
export const SelectMarketplace = ({
  dropdownClass,
  placeholder,
  value,
  options,
  isSearchable,
  onChange,
  StylesConfig,
  isDisabled,
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
      isDisabled={isDisabled}
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
