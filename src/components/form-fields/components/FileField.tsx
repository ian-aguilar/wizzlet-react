import {useEffect, useState} from "react";
import {Controller, FieldValues} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
// ** Helper Functions and Types **
import {FilePropsType} from "../types";
import {checkFileFormat, fileSizeGenerator} from "@/utils";
import {CameraBgIcon, CloseIconSvg} from "@/assets/Svg";

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
    <div className="field__wrapper relative flex flex-col h-[95%] ">
      <div className="field__inner__wrapper">
        <div className="file__upload__wrapper">
          <div className="upload__btn absolute inset-0 z-10 border border-greenPrimary/30 border-dashed bg-greenPrimary/5 rounded-md  ">
            {control && name && (
              <Controller
                name={name}
                control={control}
                render={({field: {onChange, name: fieldName}}) => (
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
        render={({message}) => (
          <span className={`errorText-file text-red-400 text-xs ${errorClass}`}>
            {message}
          </span>
        )}
      />

      <div
        className={`attachments__up__wrapper p-6 absolute w-full h-full  ${
          urls.length > 0 || attachments.length > 0 ? "z-[11]" : "z-[9]"
        }  border border-greenPrimary/30 border-dashed bg-[#e6f5f1] rounded-md `}
      >
        {urls.map((url, index) => (
          <div
            className="attachments__box flex flex-col h-full "
            key={`url-${index}`}
          >
            <div className="attachments__details ">
              <img
                src={url}
                alt={`attachment-url-${index + 1}`}
                className="attachment-img "
              />
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
            <div
              className="attachments__box flex flex-col items-center mb-[10px] h-full last:mb-0 "
              key={index}
            >
              <div className="attachments__details w-full h-[80%]">
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
                <CloseIconSvg />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FileField;
