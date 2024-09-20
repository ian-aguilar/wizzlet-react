import { IInputBox } from "./types";

export const InputBox = ({
  value,
  placeholder,
  className,
  type,
  onChange,
}: IInputBox) => {
  return (
    <div>
      <input
        onChange={onChange}
        value={value as string}
        type={type}
        className={`bg-inputAuthBg/60 p-2 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary  focus:outline-greenPrimary font-normal text-base transition-all duration-300 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
};
