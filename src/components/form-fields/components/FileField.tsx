// ** Packages **
import _ from "lodash";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import {ReactNode, useEffect, useState} from "react";
import {Controller} from "react-hook-form";

// ** CSS **
// import "./style/fileField.css";

// // ** Custom Component **
// import Icon from "components/Icon";
// import IconButton from "components/Theme/Button/IconButton";
// import {fileSizeGenerator} from "modules/Entity/components/DetailPage/components/MultiFileUpload";
// import HelperText from "./HelperText";
// import Label from "./Label";

// ** Type **
// import {FilePropsType} from "components/FormField/types/formField.types";

// ** Helper **
// import {checkFileFormat} from "components/FormField/helper/fieldValueSetter";
import {TextLabel} from "@/components/common/TextLabel";
import Button from "./Button";
import {FormControlProp} from "../types";
import {ErrorMessage} from "@hookform/error-message";
// import {number, string} from "yup";
export enum ATTACHMENT_FILE_TYPES {
  PNG = "image/png",
  JPG = "image/jpg",
  JPEG = "image/jpeg",
  GIF = "image/gif",
  MP3 = "audio/mp3",
  OGG = "audio/ogg",
  MPEG = "audio/mpeg",
  MP4 = "video/mp4",
  WEBM = "video/webm",
  OGG_VIDEO = "video/ogg",
  PLAIN_TEXT = "text/plain",
  PDF = "application/pdf",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  XLS = "application/vnd.ms-excel",
  XLSM = "application/vnd.ms-excel.sheet.macroEnabled.12",
  DOC = "application/msword",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
//   12:31 PM

//  OPTION TYPE
export type Option = {
  isNew?: boolean;
  label: string;
  value: string | number;
  selected?: boolean;
  checked?: boolean;
  onChange?: () => void;
  color?: string;
  extraLabel?: string;
  [key: string]: any;
};

export const checkFileFormat = (props: {
  allowedFormat: Option[];
  errorMsgArr: string[];
  type: string;
}) => {
  const {allowedFormat, errorMsgArr, type} = props;
  let isAllowedFormat = allowedFormat.find(
    (format) => format.value === type
  )?.label;

  if (!allowedFormat?.length) {
    isAllowedFormat = Object.keys(ATTACHMENT_FILE_TYPES).find(
      (key) => (ATTACHMENT_FILE_TYPES as any)[key] === type
    );
  }

  const formatString = allowedFormat?.length
    ? allowedFormat.map((format) => format.label.trim())
    : Object.keys(ATTACHMENT_FILE_TYPES).map(
        (key) => `${key.split("_")[0]} ${key.split("_")[1] || ""}`
      );

  if (!isAllowedFormat && errorMsgArr.join(",") !== formatString.join(",")) {
    return formatString;
  }

  return [];
};

export interface FilePropsType<T extends FieldValues> {
  id?: string;
  errors: FieldErrors;
  value?: string;
  control: any;
  setValue?: (name: string, attachment: any) => void;
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  maxSize?: number;
  className?: string;
  errorClass?: string;
  required?: boolean;
  disabled?: boolean;
  allowedFormat?: any;
  onBlur?: () => void;
  onFocus?: () => void;
  setError?: any;
  onKeyDown?: () => void;
  clearErrors?: (name: string) => void;
}

export const fileSizeGenerator = (fileSize: number) => {
  const sizeType = ["KB", "MB", "GB", "bytes"];
  if (fileSize < 1024) {
    return {size: fileSize.toFixed(1), sizeType: sizeType[3]}; // Display in BYTES
  }

  let i = -1;
  let size = fileSize;
  while (size > 1024) {
    size /= 1024;
    i++;
  }

  return {size: Math.max(size, 0.1).toFixed(1), sizeType: sizeType[i]};
};
const FileField = <T extends FieldValues>(fieldProps: FilePropsType<T>) => {
  const {
    id,
    errors,
    value,
    control,
    setValue,
    name = "",
    label = "",
    maxSize = 1,
    className = "",
    errorClass = "",
    register,
    // required = false,
    disabled = false,
    allowedFormat = [],
    onBlur = () => ({}),
    onFocus = () => ({}),
    setError = () => ({}),
    onKeyDown = () => ({}),
    clearErrors = () => ({}),
  } = fieldProps;

  const [attachment, setAttachments] = useState<any[]>([]);

  useEffect(() => {
    setValue?.(name, attachment as any);
  }, [attachment]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      console.log("INSIIIIIIIIIIIIIIDE");

      let errorMsgArr: string[] = [];
      const largeErrorMsgArr: string[] = [];
      const FilteredFiles: File[] = [];

      Array(...e.target.files).forEach((file) => {
        const type = _.cloneDeep(file.type);
        const typeError = checkFileFormat({allowedFormat, errorMsgArr, type});
        if (typeError?.length) {
          errorMsgArr = [...typeError];
        } else if (file.size / 1024 / 1024 > maxSize) {
          largeErrorMsgArr.push(file.name);
        }
        FilteredFiles.push(file);
      });

      if (FilteredFiles.length) {
        setAttachments((prev) => [...prev, ...FilteredFiles]);
        clearErrors(name);
      }

      console.log(errorMsgArr, "errorMsgArr");
      console.log(largeErrorMsgArr, "largeErrorMsgArr");

      if (errorMsgArr.length) {
        const isSingleError = errorMsgArr?.length === 1;
        setError(name, {
          type: "custom",
          message: `Only ${errorMsgArr.join(", ")} ${
            isSingleError ? "format" : "formats"
          } ${isSingleError ? "is" : "are"} allowed`,
        });
      }
      if (largeErrorMsgArr.length) {
        setError(name, {
          type: "custom",
          message: `File size is too large, it must be less than ${maxSize} MB.`,
        });
      }
    }
  };

  const deleteAttachment = (id: number) => {
    setAttachments((prev) => {
      return prev.filter((_val, index) => id !== index);
    });
    clearErrors(name);
  };

  console.log(errors, "errors>>>>>>>>>>>>>>>>>>>");

  return (
    <>
      <div className="field__wrapper">
        {/* {label && <TextLabel name={label} />} */}
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
                  render={({
                    field: {onChange: innerOnChange, name: innerName},
                  }) => {
                    return (
                      <input
                        id={id}
                        multiple
                        // {...register(name)}
                        type="file"
                        value={value}
                        onBlur={onBlur}
                        name={innerName}
                        onFocus={onFocus}
                        autoComplete="off"
                        disabled={disabled}
                        onChange={(e) => {
                          handleFileSelect(e);
                          console.log(
                            e.target.value,
                            "e>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
                          );

                          innerOnChange({target: {value: e.target.files}});
                        }}
                        onKeyDown={onKeyDown}
                        accept={`${allowedFormat
                          ?.map((e: any) => e.value)
                          ?.join(",")}`}
                        className={`cursor-pointer absolute top-0 left-0 w-full h-full z-[3] opacity-0 ${className}`}
                      />
                    );
                  }}
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
          render={({message}) => (
            <span className="errorText-file text-red-400 text-xs">
              {message}
            </span>
          )}
        />

        <div className="attachments__up__wrapper mt-[17px]">
          {([...attachment] || [])?.map((val: any, index: number) => {
            const file = val as File;
            const fileSize = fileSizeGenerator(file.size);
            return (
              <div
                className="attachments__box flex items-center mb-[10px] last:mb-0"
                key={index + 1}
              >
                <div className="attachments__details flex items-center w-[calc(100%_-_125px)] pr-[10px]">
                  {/* <Icon
                    className="w-[20px] h-[20px] mr-[8px] relative top-[-2px]"
                    fill="var(--primaryColorSD)"
                    name="noImgStrokeSD"
                  /> */}
                  <span className="attachments__name whitespace-pre overflow-hidden text-ellipsis text-[14px] font-Biotif__Medium text-textDark">
                    {file?.name || ""}
                  </span>
                </div>
                <div className="attachments__size !w-[100px] text-[14px] font-Biotif__Medium text-textDark pr-[8px]">{`${fileSize.size} ${fileSize.sizeType}`}</div>
                <Button
                  btnName="btn"
                  btnClass="action__btn__SD text-[0px] w-[24px] h-[24px] p-[4px] top-[-1px] rounded-full overflow-hidden shadow-raiseShadow relative duration-300 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-bgWhiteSD before:duration-300"
                  onClickHandler={() => {
                    deleteAttachment(index);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FileField;
