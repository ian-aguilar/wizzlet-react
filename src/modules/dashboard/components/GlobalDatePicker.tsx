import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerWithMonthSelectProps {
  selectedMonth: string;
  startDate: Date;
  endDate: Date;
  onMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

const DatePickerWithMonthSelect: React.FC<DatePickerWithMonthSelectProps> = ({
  selectedMonth,
  startDate,
  endDate,
  onMonthChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <label htmlFor="month-select">Select Month: </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={onMonthChange}>
          {Array.from({ length: 12 }, (_, i) => {
            const monthName = new Date(0, i).toLocaleString("en-US", {
              month: "long",
            });
            return (
              <option key={i} value={monthName}>
                {monthName}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label htmlFor="date-range">Select Date Range: </label>
        <DatePicker
          selected={startDate}
          onChange={onStartDateChange}
          startDate={startDate}
          endDate={endDate}
          dateFormat={"dd/MM/yyyy"}
          selectsStart
          inline={false}
        />
        <DatePicker
          selected={endDate}
          onChange={onEndDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsEnd
          minDate={startDate}
          dateFormat={"dd/MM/yyyy"}
          inline={false}
        />
      </div>
    </div>
  );
};

export default DatePickerWithMonthSelect;
