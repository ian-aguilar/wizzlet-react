import { IDropDown } from "../types";
import Select from "react-select";

export default function DropDown({ dropdownClass, placeholder, value, options, isSearchable, onChange }: IDropDown) {
  const newOptions = options.map((option: { id: number; name: string }) => {
    return { label: option.name, value: option.name.toLocaleLowerCase() };
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
