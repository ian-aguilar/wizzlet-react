import { IDropDown } from "../types";

export default function DropDown({
  dropdownClass,
  dropdownName,
  value,
  options,
  BtnIconLeft,
  btnEndIcon,
  onChange,
}: IDropDown) {
  return (
    <select name="" value={value} className={dropdownClass} id="" onChange={onChange}>
      <option disabled={dropdownName === "Limit"} value={""}>
        {BtnIconLeft} {dropdownName} {btnEndIcon}
      </option>
      {options.map((option: any) => {
        return (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}
