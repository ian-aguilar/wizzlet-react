import { useEffect, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// ** Helper Functions and Types **
import { FilePropsType } from "../types";
import { checkFileFormat, fileSizeGenerator } from "@/utils";

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
    defaultValue = [], // Add a defaultValue prop for URLs
  } = fieldProps;

  const [attachments, setAttachments] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>(defaultValue); // State to manage URLs

  useEffect(() => {
    setValue?.(name, [...urls, ...attachments]); // Include both URLs and files in the value
  }, [attachments, urls]);

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
        setAttachments((prev) => [...prev, ...filteredFiles]);
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

  const deleteAttachment = (id: number, isUrl: boolean) => {
    if (isUrl) {
      setUrls((prev) => prev.filter((_val, index) => id !== index));
    } else {
      setAttachments((prev) => prev.filter((_val, index) => id !== index));
    }
    clearErrors?.(name);
  };

  return (
    <div className="field__wrapper">
      <div className="field__inner__wrapper">
        <div className="file__upload__wrapper h-[40px] rounded-[6px] shadow-raiseShadow px-[8px] pl-[12px] py-[2px] flex items-center bg-bgWhiteSD">
          <p className="text-[14px] font-Biotif__Medium text-textSecondary whitespace-pre overflow-hidden text-ellipsis pr-[14px] w-full">
            Choose File to upload
          </p>
          <div className="upload__btn cursor-pointer inline-flex items-center shrink-0 relative">
            {control && name && (
              <Controller
                name={name}
                control={control}
                render={({ field: { onChange, name: fieldName } }) => (
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
                      onChange(e.target.files);
                    }}
                    className={`cursor-pointer absolute top-0 left-0 w-full h-full z-[3] opacity-0 ${className}`}
                  />
                )}
              />
            )}
            <button className="button_SD primary__Btn">
              <span className="btn__text">Upload File</span>
            </button>
          </div>
        </div>
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <span className={`errorText-file text-red-400 text-xs ${errorClass}`}>
            {message}
          </span>
        )}
      />

      <div className="attachments__up__wrapper mt-[17px]">
        {urls.map((url, index) => (
          <div
            className="attachments__box flex items-center mb-[10px] last:mb-0"
            key={`url-${index}`}
          >
            <div className="attachments__details flex items-center">
              <img
                src={url}
                alt={`attachment-url-${index + 1}`}
                className="attachment-img"
              />
            </div>

            <div className="attachments__details flex items-center w-[calc(100%_-_125px)] pr-[10px]">
              <span className="attachments__name whitespace-pre overflow-hidden text-ellipsis text-[14px] font-Biotif__Medium text-textDark">
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
            <div
              className="attachments__box flex items-center mb-[10px] last:mb-0"
              key={index}
            >
              <div className="attachments__details flex items-center">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`attachment-${index + 1}`}
                    className="attachment-img"
                  />
                ) : null}
              </div>

              <div className="attachments__details flex items-center w-[calc(100%_-_125px)] pr-[10px]">
                <span className="attachments__name whitespace-pre overflow-hidden text-ellipsis text-[14px] font-Biotif__Medium text-textDark">
                  {file.name}
                </span>
              </div>
              <div className="attachments__size !w-[100px] text-[14px] font-Biotif__Medium text-textDark pr-[8px]">
                {`${fileSize.size} ${fileSize.sizeType}`}
              </div>
              <button
                className="action__btn__SD text-[14px] w-[24px] h-[24px] p-[4px] top-[-1px] rounded-full overflow-hidden shadow-raiseShadow relative duration-300"
                name="Delete"
                title="Delete"
                onClick={() => deleteAttachment(index, false)}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileField;
