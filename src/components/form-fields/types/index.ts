import { ATTACHMENT_FILE_TYPES } from "@/constants";
import { MouseEvent, ReactNode } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type FormControlProp<T extends FieldValues = FieldValues> = Control<T>;

export type IInputProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  inputEndIcon?: ReactNode;
  control?: FormControlProp<T>;
  label?: string;
  errors?: FieldErrors;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  textLabelName?: string;
  withLabel?: boolean;
  isDisabled?: boolean;
};

export type IFileUploadProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  inputEndIcon?: ReactNode;
  control?: FormControlProp<T>;
  label?: string;
  errors?: FieldErrors;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  textLabelName?: string;
  withLabel?: boolean;
  register: UseFormRegister<T>;
};

export enum btnShowType {
  primary = "primary",
  green = "green",
}
export interface IButtonProps {
  btnName: string;
  type?: "button" | "submit" | "reset";
  showType?: btnShowType;
  btnClass?: string;
  onClickHandler?: (e: MouseEvent<HTMLElement>) => void;
  isLoading?: boolean;
  loaderClass?: string;
  disabled?: boolean;
  btnEndIcon?: ReactNode;
  BtnIconRight?: string;
}

export interface IOtpInputProps {
  onChangeHandler: (otp: string) => void;
  value: string;
}

export interface FilePropsType<T extends FieldValues> {
  id?: string;
  errors: FieldErrors<T>;
  value?: string;
  control: Control<T>;
  setValue?: (name: Path<T>, attachment: File[]) => void;
  name: any;
  label: string;
  register: UseFormRegister<T>;
  maxSize?: number;
  className?: string;
  errorClass?: string;
  required?: boolean;
  disabled?: boolean;
  allowedFormat?: string[];
  onBlur?: () => void;
  onFocus?: () => void;
  setError?: (
    name: Path<T>,
    error: {
      type: string;
      message: string;
    }
  ) => void;
  clearErrors?: (name: Path<T>) => void;
}
