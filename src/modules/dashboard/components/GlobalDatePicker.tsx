import { CalendarMainSVG } from "@/assets/Svg";
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
    <div className="flex justify-between items-center w-full bg-white   py-3 px-5 mb-2  pr-10">
      <div>
        <h2 className="text-3xl font-bold line-clamp-1">Hello, Devid!</h2>
        <p className="text-grayText text-lg line-clamp-1">
          Explore Marketplace Information and activity
        </p>
      </div>
      <div className="flex gap-2 border border-grayLightBody rounded-md items-center">
        <div className="flex gap-4">
          {/* <label htmlFor="month-select">Select Month: </label> */}
          <select
            className="bg-black text-white py-2 lg:px-2 !rounded-r-none "
            id="month-select"
            value={selectedMonth}
            onChange={onMonthChange}
          >
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

        <div className="rounded-r-md flex  ">
          {/* <label htmlFor="date-range">Select Date Range: </label> */}
          <div>
            <CalendarMainSVG />
          </div>
          <DatePicker
            className="  focus:outline-none text-center"
            selected={startDate}
            onChange={onStartDateChange}
            startDate={startDate}
            endDate={endDate}
            dateFormat={"dd/MM/YYYY "}
            selectsStart
            inline={false}
          />
          <DatePicker
            className="   focus:outline-none text-center "
            selected={endDate}
            onChange={onEndDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsEnd
            minDate={startDate}
            dateFormat={"dd/MM/YYYY "}
            inline={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePickerWithMonthSelect;
