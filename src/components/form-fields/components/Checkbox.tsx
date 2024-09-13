import { ICheckboxProps } from "../types";

const Checkbox = ({
  checkLabel,
  isChecked,
  onChange,
  value,
  mainClass,
}: ICheckboxProps) => {
  return (
    <>
      <div className={` flex items-center ${mainClass} `}>
        <input
          id="abc"
          value={value}
          onChange={onChange}
          defaultChecked={isChecked}
          type="checkbox"
          className="h-4 w-4 rounded-[2px] border-solid border-gray-300 accent-greenPrimary hover:ring-greenPrimary duration-300 transition-all  "
        />
        <label
          className="ml-2 text-darkText font-medium text-base leading-4 "
          htmlFor="abc"
        >
          {checkLabel}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
