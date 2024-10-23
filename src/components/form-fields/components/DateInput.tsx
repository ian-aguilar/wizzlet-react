import DatePicker from "react-datepicker";
import { ErrorMessage } from "@hookform/error-message";
import { Controller, FieldValues } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

import { IDateInputProps } from "../types";
import moment from "moment";

const DateInput = <T extends FieldValues>({
  placeholder,
  className,
  control,
  label,
  name,
  errors,
  isDisabled,
}: IDateInputProps<T>) => {
  return (
    <div className="relative mb-2">
      <label className="pb-1 block">{label}</label>

      <div className="relative mb-4">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <DatePicker
              className={`  ${className}`}
              selected={
                value
                  ? (moment(value, "YYYY-MM-DD").toDate() as any) !=
                    "Invalid Date"
                    ? moment(value, "YYYY-MM-DD").toDate()
                    : null
                  : null
              }
              placeholderText={placeholder || "mm/dd/yyyy"}
              onChange={(e) => onChange(moment(e).format("YYYY-MM-DD"))}
              onBlur={onBlur}
              disabled={isDisabled}
            />
          )}
        />

        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <span className="errorText text-red-600 font-medium text-sm">
              {message}
            </span>
          )}
        />
      </div>
      <span className="errorText text-red-400 text-xs"> </span>
    </div>
  );
};
export default DateInput;
