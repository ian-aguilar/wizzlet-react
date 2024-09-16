// ** Packages **
import Select from "react-select";
import { ISelectCategoryProps } from "../types";

export const SelectMarketplace = ({
  dropdownClass,
  placeholder,
  value,
  options,
  isSearchable,
  onChange,
}: ISelectCategoryProps) => {
  return (
    <Select
      options={options}
      isSearchable={isSearchable}
      value={value}
      placeholder={placeholder}
      className={dropdownClass}
      onChange={onChange}
    />
  );
};
