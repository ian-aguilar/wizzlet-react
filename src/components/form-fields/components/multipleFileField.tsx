import { CameraBgIcon, DeleteIcon } from "@/assets/Svg";
import { VITE_APP_API_URL } from "@/config";
import { checkFileFormat } from "@/utils";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { IFilePropsType } from "../types";

const MultipleImageUpload = <T extends FieldValues>(
  fieldProps: IFilePropsType<T>
) => {
  const {
    id,
    errors,
    control,
    setValue,
    name,
    maxSize = 8,
    className = "",
    disabled = false,
    allowedFormat = [],
    onBlur,
    onFocus,
    setError,
    clearErrors,
    watch,
  } = fieldProps;

  // Use watch to track the current value of the field
  const defaultValue: File[] | string[] = Array.isArray(watch(name))
    ? watch(name)
    : typeof watch(name) === "string" && watch(name).trim() !== ""
    ? [watch(name)]
    : [];

  // Handle file selection and validation
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const errorMsgArr: string[] = [];
      const largeErrorMsgArr: string[] = [];
      const filteredFiles: File[] = [];

      Array.from(e.target.files).forEach((file) => {
        const typeError = checkFileFormat({
          allowedFormat,
          errorMsgArr,
          type: file.type,
        });
        if (typeError.length) {
          errorMsgArr.push(...typeError);
        } else if (file.size / 1024 / 1024 > maxSize) {
          largeErrorMsgArr.push(file.name);
        } else {
          filteredFiles.push(file);
        }
      });

      if (filteredFiles.length) {
        setValue(
          name,
          [...defaultValue, ...filteredFiles] as PathValue<T, Path<T>>,
          {
            shouldValidate: true,
          }
        );
      }

      if (errorMsgArr.length && setError) {
        setError(name, {
          type: "custom",
          message: errorMsgArr.join(", "),
        });
      } else if (largeErrorMsgArr.length && setError) {
        setError(name, {
          type: "custom",
          message: `File size is too large; it must be less than ${maxSize} MB.`,
        });
      } else {
        clearErrors?.(name);
      }
    }
    e.target.value = ""; // Reset input value to allow the same file upload again
  };

  // Delete an attachment
  const deleteAttachment = (id: number) => {
    setValue(
      name,
      [...defaultValue.filter((_, index: number) => id !== index)] as PathValue<
        T,
        Path<T>
      >,
      { shouldValidate: true }
    );
    clearErrors?.(name);
  };

  return (
    <div className="field__wrapper relative flex  gap-4 ">
      <div>
        <div className="field__inner__wrapper">
          <div className="file__upload__wrapper">
            <div className="upload__btn  border border-greenPrimary/30 border-dashed bg-greenPrimary/5 rounded-md">
              {control && name && (
                <Controller
                  name={name as Path<T>}
                  control={control}
                  render={({ field: { name: fieldName } }) => (
                    <input
                      id={id}
                      multiple
                      type="file"
                      onBlur={onBlur}
                      name={fieldName}
                      onFocus={onFocus}
                      autoComplete="off"
                      disabled={disabled}
                      accept="image/*"
                      onChange={handleFileSelect}
                      className={`cursor-pointer absolute top-0 left-0 w-full h-full z-[3] opacity-0 ${className}`}
                    />
                  )}
                />
              )}
              <div className="button_SD primary__Btn items-center justify-center p-6 flex w-full flex-col h-full">
                <div className="text-center">
                  <div>
                    <CameraBgIcon className="inline-block mx-auto !w-20 !h-20 !min-w-20 mb-4" />
                  </div>
                  <h3 className="text-2xl text-blackPrimary font-bold">
                    Upload Photos
                  </h3>
                  <p className="text-base text-blackPrimary text-center">
                    Drag and drop Images files to upload
                  </p>
                  <p className="text-[14px] text-grayText text-center">
                    Max {maxSize} MB per photo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <div className="errorText text-red-600 font-medium text-sm">
              {message}
            </div>
          )}
        />
      </div>
      <div
        className={`attachments__up__wrapper   w-full flex gap-4  flex-wrap ${
          defaultValue.length > 0 ? "z-[11]" : "z-[9]"
        }    rounded-md`}>
        {defaultValue.map((value, index) => {
          const isUrl = typeof value === "string";

          return (
            <div
              className="attachments__box flex  flex-col  items-center relative mt-5 border border-black/10 rounded-md  "
              key={`url-${index}`}>
              <div className="attachments__details flex gap-4 items-center h-full">
                <img
                  src={
                    isUrl
                      ? value.indexOf("http") !== -1
                        ? value
                        : VITE_APP_API_URL + value
                      : URL.createObjectURL(value as File)
                  }
                  alt={`attachment-url-${index + 1}`}
                  className="attachment-img w-36 h-20 object-contain "
                />
              </div>
              <button
                className="action__btn__SD bg-redAlert/10 rounded-b-md w-full flex justify-center p-1"
                name="Delete"
                title="Delete"
                onClick={() => deleteAttachment(index)}>
                <DeleteIcon className="text-redAlert" />
              </button>
              <div className="attachments__details absolute left-0 -top-6   ">
                <span className="attachments__name  mb-1 !line-clamp-1 block break-all">
                  {isUrl ? value.split("/").pop() : (value as File).name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleImageUpload;
