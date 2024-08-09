import {FieldValues} from "react-hook-form";
import {IFileUploadProps} from "../types";
import {ErrorMessage} from "@hookform/error-message";

const UploadFile = <T extends FieldValues>({
  placeholder,
  className,
  textLabelName,
  name,
  errors,
  autoComplete,
  register,
}: IFileUploadProps<T>) => {
  return (
    <div className="relative mb-2">
      <label className="pb-1 block">{textLabelName}</label>
      <input
        {...register(name)}
        type="file"
        className={`bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary font-normal text-base mb-4 transition-all duration-300 ${className}`}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <span className="errorText text-red-400 text-xs"> </span>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({message}) => (
          <span className="errorText text-red-400 text-xs">{message}</span>
        )}
      />
    </div>
  );
};

export default UploadFile;
