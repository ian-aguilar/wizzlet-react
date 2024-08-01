import { ErrorMessage } from "@hookform/error-message";
import { IInputProps } from "../types";
import { Controller, FieldValues } from "react-hook-form";

const Input = <T extends FieldValues>({
  placeholder,
  className,
  InputEndIcon,
  control,
  name,
  errors,
  // label,
  type,
}: IInputProps<T>) => {
  return (
    <>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              type={type ? type : "text"}
              className={` bg-inputAuthBg/60   p-4 rounded-md text-grayLightBody w-full outline-none hover:outline-greenPrimary font-normal text-base mb-4 transition-all duration-300 ${className} `}
              placeholder={placeholder}
            />
          )}
        />

        {InputEndIcon && (
          <div className="absolute right-4 top-5 "> {InputEndIcon} </div>
        )}
        <span className="errorText text-red-400 text-xs"> </span>

        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <span className="text-red-500 text-xs font-medium mt-1">
              {message}
            </span>
          )}
        />
      </div>
    </>
  );
};

export default Input;
