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

export interface FileUploadProps {
  allowedImageTypes: string[];
  allowedVideoTypes: string[];
  maxImageSizeInMB: number;
  maxVideoSizeInMB: number;
  onFileSelect: (file: File | null) => void;
}

export interface InputSwitchProps {
  id: number;
  status: string;
  onToggle: (id: number, status: string) => void;
}


export interface ISearchBox {
  value?: string | number;
  name: string;
  placeholder: string;
  className: string;
  InputLeftIcon?: ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}