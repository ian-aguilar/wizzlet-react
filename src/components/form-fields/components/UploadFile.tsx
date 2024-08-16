import { FieldValues } from "react-hook-form";
import { IFileUploadProps } from "../types";
import { ErrorMessage } from "@hookform/error-message";
import { CameraBgIcon } from "@/assets/Svg";

const UploadFile = <T extends FieldValues>({
  placeholder,
  className,
  textLabelName,
  name,
  errors,
  autoComplete,
  // MainClass,
  register,
}: IFileUploadProps<T>) => {
  return (
    <>
      <label className="  block absolute inset-0 bg-greenPrimary/5 mb-2 rounded-md p-5 border border-dashed border-greenPrimary/10 mx-auto text-center  ">
        {textLabelName} <CameraBgIcon className="mb-6 mx-auto" />{" "}
        <span className="font-semibold text-lg text-blackPrimary">
          Upload Photo
        </span>
        <p className="text-base text-black">
          Drag and drop Images files to upload
        </p>
        <p className="text-grayText text-sm">
          max 1 photos and 8mb file size limit
        </p>
        <div className="p-1 border-2 border-greenPrimary/60 rounded-md inline-block mx-auto px-4 text-greenPrimary mt-4 cursor-pointer hover:brightness-125 duration-300 transition-all">
          Select Photo
        </div>
        <input
          {...register(name)}
          type="file"
          className={`bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary font-normal text-base mb-4 transition-all duration-300 opacity-0  ${className}`}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </label>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className="errorText text-red-400 text-xs">{message}</span>
        )}
      />
    </>
  );
};

export default UploadFile;
