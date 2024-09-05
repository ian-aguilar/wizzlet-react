import { ISearchBox } from "./types";

export const SearchBox = ({ value, placeholder, className, InputLeftIcon, onChange }: ISearchBox) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-3">{InputLeftIcon}</div>
      <div>
        <input
          onChange={onChange}
          value={value ? value : ""}
          type={"text"}
          className={`bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary  focus:outline-greenPrimary font-normal text-base mb-1 transition-all duration-300 ${className}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
