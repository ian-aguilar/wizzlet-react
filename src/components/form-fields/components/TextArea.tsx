import { ErrorMessage } from "@hookform/error-message";
import { IInputProps, ITextAreaProps } from "../types";
import { Controller, FieldValues } from "react-hook-form";

const TextArea = <T extends FieldValues>({
  placeholder,
  control,
  textLabelName,
  name,
  errors,
  autoComplete,
  withLabel = false,
  isDisabled,
}: ITextAreaProps<T>) => {
  return (
    <div className="relative mb-2">
      <label className="pb-1 block">{textLabelName}</label>

      <TextAreaField
        placeholder={placeholder}
        control={control}
        name={name}
        errors={errors}
        autoComplete={autoComplete}
        withLabel={withLabel}
        isDisabled={isDisabled}
        className="bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary  focus:outline-greenPrimary font-normal text-base mb-1 transition-all duration-300"
      />
      <span className="errorText text-red-400 text-xs"> </span>
    </div>
  );
};

const TextAreaField = <T extends FieldValues>({
  placeholder,
  className,
  control,
  name,
  errors,
  autoComplete,
  isDisabled,
}: IInputProps<T>) => {
  return (
    <div className="relative mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <textarea
            onBlur={onBlur}
            onChange={onChange}
            value={value ? value : ""}
            className={`bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary  focus:outline-greenPrimary font-normal text-base mb-1 transition-all duration-300 ${className}`}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={isDisabled}
            rows={4}
          />
        )}
      />

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="errorText text-red-600 font-medium text-sm">{message}</span>
        )}
      />
    </div>
  );
};

export default TextArea;
