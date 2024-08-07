import { ErrorMessage } from "@hookform/error-message";
import { IInputProps } from "../types";
import { Controller, FieldValues } from "react-hook-form";
import { useState } from "react";
import { EyeIconSettings } from "@/assets/Svg";

const Input = <T extends FieldValues>({
  placeholder,
  className,
  inputEndIcon,
  control,
  textLabelName,
  name,
  errors,
  type,
  autoComplete,
  withLabel = false,
}: IInputProps<T>) => {
  return (
    <div className="relative mb-2">
      <label className="pb-1 block">{textLabelName}</label>

      <InputField
        placeholder={placeholder}
        inputEndIcon={inputEndIcon}
        control={control}
        type={type}
        name={name}
        errors={errors}
        autoComplete={autoComplete}
        withLabel={withLabel}
        className={` bg-inputAuthBg/60   p-3 rounded-md text-grayLightBody w-full outline-none focus:outline-none font-normal text-base mb-2 transition-all duration-300 ${className} `}
      />
      <span className="errorText text-red-400 text-xs"> </span>
    </div>
  );
};

const InputField = <T extends FieldValues>({
  placeholder,
  className,
  inputEndIcon,
  control,
  name,
  errors,
  type,
  autoComplete,
}: IInputProps<T>) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div className="relative mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            onBlur={onBlur}
            onChange={onChange}
            value={value ? value : ""}
            type={!isShow && type ? type : "text"}
            className={`bg-inputAuthBg/60 p-3 rounded-md text-gray-700 w-full outline-none hover:outline-greenPrimary font-normal text-base mb-4 transition-all duration-300 ${className}`}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
        )}
      />

      {inputEndIcon && (
        <div
          className="absolute right-4 top-4"
          onClick={() => setIsShow((prev) => !prev)}
        >
          {!isShow ? inputEndIcon : <EyeIconSettings />}
        </div>
      )}

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="errorText text-red-400 text-xs">{message}</span>
        )}
      />
    </div>
  );
};

export default Input;
