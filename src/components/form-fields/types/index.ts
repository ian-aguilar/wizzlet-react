import { MouseEvent, ReactNode } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
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
  MainClass?: string;
  register: UseFormRegister<T>;
};

export enum btnShowType {
  primary = "primary",
  green = "green",
  red = "red",
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
  BtnIconRight?: ReactNode;
  BtnIconLeft?: ReactNode;
  btnEndIcon?: ReactNode;
}

export interface ModalCommonProps {
  heading: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelButtonText: string;
  confirmButtonText: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export interface BaseModalCommonProps {
  heading: string;
  subText: string;
  keyWord?: string;
  onCancel: () => void;
  onConfirm?: () => void;
  cancelButtonText: string;
  confirmButtonText: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  showType: btnShowType;
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
  setValue: UseFormSetValue<T>;
  // setValue: (name: Path<T>, attachment: any) => void;

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
  // defaultValue?: string[];
  watch: UseFormWatch<T>;
}
export interface inviteModalProps {
  link: string | undefined | null;
  onClose: () => void;
}

export interface errorModalProps {
  onClose: () => void;
  onSave?: () => void;
  isLoading?: boolean;
  heading: string;
  subText: string;
}

export interface warningModalProps {
  onClose: () => void;
  onSave?: () => void;
  heading: string;
  confirmButtonText: string;
}

export type ITextAreaProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  control?: FormControlProp<T>;
  label?: string;
  errors?: FieldErrors;
  placeholder?: string;
  autoComplete?: string;
  textLabelName?: string;
  withLabel?: boolean;
  isDisabled?: boolean;
};
