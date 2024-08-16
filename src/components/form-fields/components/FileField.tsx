// import { useEffect, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// ** Helper Functions and Types **
import { FilePropsType } from "../types";
import { checkFileFormat } from "@/utils";
import { CameraBgIcon } from "@/assets/Svg";
import { VITE_APP_API_URL } from "@/config";

const FileField = <T extends FieldValues>(fieldProps: FilePropsType<T>) => {
  const {
    id,
    errors,
    control,
    setValue,
    name,
    maxSize = 1,
    className = "",
    errorClass = "",
    disabled = false,
    allowedFormat = [],
    onBlur,
    onFocus,
    setError,
    clearErrors,
    // defaultValue = [], // Add a defaultValue prop for URLs
    watch,
  } = fieldProps;

  const defaultValue: any = Array.isArray(watch(name))
    ? watch(name)
    : typeof watch(name) === "string" && watch(name).trim() !== ""
    ? [watch(name)]
    : [];

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
        }
        filteredFiles.push(file);
      });

      if (filteredFiles.length) {
        // setValue(name, ["xyz"] as any);
        setValue(name, [...defaultValue, ...filteredFiles] as any);

        // setAttachments((prev) => [...prev, ...filteredFiles]);
      }

      if (errorMsgArr.length && setError) {
        setError(name, {
          type: "custom",
          message: errorMsgArr.join(", "),
        });
      }
      if (largeErrorMsgArr.length && setError) {
        setError(name, {
          type: "custom",
          message: `File size is too large, it must be less than ${maxSize} MB.`,
        });
      }
    }
    e.target.value = "";
  };

  const deleteAttachment = (id: number) => {
    setValue(name, [
      ...defaultValue.filter((_: any, index: number) => id !== index),
    ] as any);
    clearErrors?.(name);
  };

  return (
    <div className="field__wrapper relative flex flex-col h-[95%] ">
      <div className="field__inner__wrapper">
        <div className="file__upload__wrapper">
          <div className="upload__btn absolute inset-0 z-10 border border-greenPrimary/30 border-dashed bg-greenPrimary/5 rounded-md  ">
            {control && name && (
              <Controller
                name={name}
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
                    onChange={(e) => {
                      handleFileSelect(e);
                      // onChange(e.target.files);
                    }}
                    className={`cursor-pointer absolute top-0 left-0 w-full h-full z-[3] opacity-0 ${className}`}
                  />
                )}
              />
            )}
            <div className="button_SD primary__Btn  items-center justify-center p-6 flex w-full flex-col h-full">
              <div className="text-center">
                <div>
                  <CameraBgIcon className=" inline-block mx-auto  !w-20 !h-20 !min-w-20 mb-4" />
                </div>
                <h3 className="text-2xl text-blackPrimary font-bold ">
                  Upload Photo
                </h3>
                <p className="text-base text-blackPrimary  text-center">
                  Drag and drop Images files to upload
                </p>
                <p className="text-[14px] text-grayText text-center ">
                  max 1 photos and 8mb file size limit
                </p>
                {/* <span className="btn__text">Upload File</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span
            className={`errorText-file text-red-400 text-s text-center z-[11] ${errorClass}`}
          >
            {message}
          </span>
        )}
      />

      <div
        className={`attachments__up__wrapper p-6 absolute w-full h-full ${
          defaultValue.length > 0 ? "z-[11]" : "z-[9]"
        } border border-greenPrimary/30 border-dashed bg-[#e6f5f1] rounded-md `}
      >
        {defaultValue.map((value: any, index: number) => {
          const isUrl = typeof value === "string";

          return (
            <div
              className="attachments__box flex items-center mb-[10px] last:mb-0"
              key={`url-${index}`}
            >
              <div className="attachments__details flex items-center">
                <img
                  src={
                    isUrl
                      ? VITE_APP_API_URL + value
                      : URL.createObjectURL(value)
                  }
                  alt={`attachment-url-${index + 1}`}
                  className="attachment-img"
                />
              </div>

              <div className="attachments__details text-center ">
                <span className="attachments__name whitespace-pre overflow-hidden  ">
                  {isUrl ? value.split("/").pop() : (value as File).name}
                </span>
              </div>
              <button
                className="action__btn__SD text-[14px] w-[24px] h-[24px] p-[4px] top-[-1px] rounded-full overflow-hidden shadow-raiseShadow relative duration-300"
                name="Delete"
                title="Delete"
                onClick={() => deleteAttachment(index)}
              >
                ✕
              </button>
            </div>
          );
        })}

        {/* {urls.map((url, index) => (
          <div
            className="attachments__box flex items-center mb-[10px] last:mb-0"
            key={`url-${index}`}
          >
            <div className="attachments__details flex items-center">
              <img src={url} alt={`attachment-url-${index + 1}`} className="attachment-img" />
            </div>

            <div className="attachments__details text-center ">
              <span className="attachments__name whitespace-pre overflow-hidden  ">
                {url.split("/").pop()}
              </span>
            </div>
            <button
              className="action__btn__SD text-[14px] w-[24px] h-[24px] p-[4px] top-[-1px] rounded-full overflow-hidden shadow-raiseShadow relative duration-300"
              name="Delete"
              title="Delete"
              onClick={() => deleteAttachment(index, true)}
            >
              ✕
            </button>
          </div>
        ))}

        {attachments.map((file, index) => {
          const fileSize = fileSizeGenerator(file.size);
          return (
            <div className="attachments__box flex items-center mb-[10px] last:mb-0" key={index}>
              <div className="attachments__details flex items-center">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`attachment-${index + 1}`}
                    className="attachment-img w-auto h-full object-contain mx-auto"
                  />
                ) : null}
              </div>

              <div className="attachments__details    text-center ">
                <span className="attachments__name whitespace-pre overflow-hidden text-ellipsis text-[14px] font-Biotif__Medium text-textDark">
                  {file.name}
                </span>
              </div>
              <div className="attachments__size   text-center ">
                {`${fileSize.size} ${fileSize.sizeType}`}
              </div>
              <button
                className="action__btn__SD absolute top-3 right-3 block z-10 "
                name="Delete"
                title="Delete"
                onClick={() => deleteAttachment(index, false)}
              >
                ✕
              </button>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default FileField;
