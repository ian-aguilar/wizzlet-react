import { MouseEvent, ReactNode } from "react";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

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
};

export interface IButtonProps {
  btnName: string;
  type?: "button" | "submit" | "reset";
  showType: "App" | "cms";
  btnClass?: string;
  onClickHandler?: (e: MouseEvent<HTMLElement>) => void;
  isLoading?: boolean;
  loaderClass?: string;
  disabled?: boolean;
  btnEndIcon?: ReactNode;
}

export interface IOtpInputProps {
  onChangeHandler: (otp: string) => void;
  value: string;
}
