import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldValues } from "react-hook-form";
import { useRef } from "react";
import { IDatePickerBoxProps } from "./types";

const DatePickerBox = <T extends FieldValues>({
  placeholder,
  className,
  label,
  name,
  isDisabled = false,
  value,
  maxDate,
  onChange,
  dateFormat = "dd/mm/yyyy",
  icon,
}: IDatePickerBoxProps<T>) => {
  const datePickerRef = useRef<DatePicker | null>(null);

  const closeDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };
  
  return (
    <div className="relative mb-2">
      <label className="pt-1 block">{label}</label>
      <div className="relative mb-4">
        <DatePicker
          ref={datePickerRef}
          icon={icon}
          dateFormat={dateFormat}
          name={name}
          maxDate={maxDate}
          className={`${className}`}
          selected={value}
          placeholderText={placeholder || "dd/mm/yyyy"}
          onChange={onChange}
          disabled={isDisabled}
          showYearDropdown 
          scrollableYearDropdown 
          yearDropdownItemNumber={15}
          showMonthDropdown
          showIcon
          onClickOutside={closeDatePicker}
          calendarIconClassName="right-1 top-1 greenPrimary"
        />
      </div>
    </div>
  );
};
export default DatePickerBox;
