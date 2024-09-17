// ** Packages **
import Select from "react-select";

// ** Icons **
import { IDropDown } from "../types";

export default function DropDown({ dropdownClass, placeholder, value, options, isSearchable, onChange }: IDropDown) {
  const newOptions = options.map((option: { id: number; name: string }) => {
    return { label: option.name, value: option.name };
  });
  return (
    <Select
      options={newOptions}
      isSearchable={isSearchable}
      value={value}
      placeholder={placeholder}
      className={dropdownClass}
      onChange={onChange}
    />
  );
}
