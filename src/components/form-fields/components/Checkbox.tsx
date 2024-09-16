import { ICheckboxProps } from "../types";

const Checkbox = ({ name, checkLabel, isChecked, onChange, value, mainClass }: ICheckboxProps) => {
  return (
    <>
      <div className={` flex items-center ${mainClass} `}>
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          checked={isChecked}
          type="checkbox"
          className="h-4 w-4 rounded-[2px] border-solid border-gray-300 accent-greenPrimary hover:ring-greenPrimary duration-300 transition-all  "
        />
        <label className="ml-2 text-darkText font-medium text-base leading-4 " htmlFor={name}>
          {checkLabel}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
