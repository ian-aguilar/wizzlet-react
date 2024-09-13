import { ChangeEventHandler, MouseEvent, ReactNode } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export type FormControlProp<T extends FieldValues = FieldValues> = Control<T>;

export type IInputProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  inputEndIcon?: ReactNode;
  InputLeftIcon?: ReactNode;
  control?: FormControlProp<T>;
  errors?: FieldErrors;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  textLabelName?: string;
  isDisabled?: boolean;
};

export type IDateInputProps<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  control?: FormControlProp<T>;
  errors?: FieldErrors;
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  InputLeftIcon?: ReactNode;
};

export type IReactQuillProps<T extends FieldValues> = {
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
  modules?: object;
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
  greenRound = "greenRound",
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
  errors: FieldErrors;
  value?: string;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
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
  clearErrors?: UseFormClearErrors<T>;
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

export type IFilePropsType<T extends FieldValues> = {
  id?: string;
  errors: FieldErrors;
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  name: Path<T>;
  maxSize?: number;
  className?: string;
  errorClass?: string;
  disabled?: boolean;
  allowedFormat?: string[];
  onBlur?: React.FocusEventHandler;
  onFocus?: React.FocusEventHandler;
  setError?: (
    name: Path<T>,
    error: {
      type: string;
      message: string;
    }
  ) => void;
  clearErrors?: UseFormClearErrors<T>;
  watch: UseFormWatch<T>;
};

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

export interface Option {
  label: string;
  value: string | number;
  role?: string | number;
  isDisabled?: boolean | undefined;
}

export interface ICustomSelect<T extends FieldValues> {
  control?: FormControlProp<T>;
  errors?: FieldErrors;
  inputClass?: string;
  isMulti?: boolean;
  label?: string;
  labelClass?: string;
  name: Path<T>;
  options: Option[];
  placeholder?: string;
  isCompulsory?: boolean;
  Margin?: string;
  Width?: string;
  onChange?: (...event: any[]) => void;
  disabled?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  className?: string;
  autoFocus?: boolean;
}
export type ICheckboxProps = {
  name?:string;
  value?: string | number | readonly string[] | undefined ,
  checkLabel: string;
  isChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>
};
