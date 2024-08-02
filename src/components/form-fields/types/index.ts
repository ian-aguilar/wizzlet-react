import { ReactNode } from "react";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export type FormControlProp<T extends FieldValues = FieldValues> = Control<T>;

export type IInputProps<T extends FieldValues> = {
  className: string;
  InputEndIcon?: ReactNode;
  control: FormControlProp<T>;
  name: Path<T>;
  label?: string;
  errors: FieldErrors;
  placeholder?: string;
  type?: string;
};

export interface IButtonProps {
  btnName: string;
  type?: "button" | "submit" | "reset";
  className: string;
}
