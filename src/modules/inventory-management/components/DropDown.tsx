// ** Packages **
import Select from "react-select";

// ** Icons **
import { IDropDown } from "../types";
import { pageLimitStyle } from "@/modules/import-products/constants";

export default function DropDown({
  dropdownClass,
  placeholder,
  value,
  options,
  isSearchable,
  onChange,
}: IDropDown) {
  const newOptions = options.map((option: { id: number; name: string }) => {
    return { label: option.name, value: option.name };
  });
  return (
    <Select
      styles={pageLimitStyle}
      options={newOptions}
      isSearchable={isSearchable}
      value={value}
      placeholder={placeholder}
      className={dropdownClass}
      onChange={onChange}
      menuPosition="fixed"
    />
  );
}
