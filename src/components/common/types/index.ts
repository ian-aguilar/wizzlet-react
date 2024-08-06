import { FormControlProp } from "@/components/form-fields/types";
import { ReactNode } from "react";
import { FieldErrors, FieldValues, Path } from "react-hook-form";

export interface ITextLabelProps<T extends FieldValues> {
  TextClass?: string;
  TextPlaceHolder?: string;
  TextEndIcon?: ReactNode;
  TextLabelName?: string;
  control?: FormControlProp<T>;
  label?: string;
  name: Path<T>;
  errors?: FieldErrors;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}
