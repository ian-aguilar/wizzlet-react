import {ErrorMessage} from "@hookform/error-message";
import {IInputProps} from "../types";
import {Controller, FieldValues} from "react-hook-form";

const TextArea = <T extends FieldValues>({
  placeholder,
  control,
  textLabelName,
  name,
  errors,
  autoComplete,
  isDisabled,
  className,
}: IInputProps<T>) => {
  return (
    <div className="mb-2">
      <label className="pb-1 block"> {textLabelName} </label>

      <Controller
        name={name}
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <textarea
            onBlur={onBlur}
            onChange={onChange}
            value={value ? value : ""}
            className={` bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary  focus:outline-greenPrimary font-normal text-base mb-1 transition-all duration-300 ${className} `}
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
        render={({message}) => (
          <span className="errorText text-red-600 font-medium text-sm">
            {message}
          </span>
        )}
      />
    </div>
  );
};

export default TextArea;
