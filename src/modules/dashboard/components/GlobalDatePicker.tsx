import { CalendarMainSVG } from "@/assets/Svg";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerWithMonthSelectProps } from "../types";

const DatePickerWithMonthSelect: React.FC<DatePickerWithMonthSelectProps> = ({
  selectedMonth,
  startDate,
  endDate,
  onMonthChange,
  onDateRangeChange,
  userFullName,
  isDatePickerOpen,
  setIsDatePickerOpen,
  className,
}) => {
  //Max Date function
  const maxDate = startDate
    ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000)
    : null;

  // Format date function
  const formatDateRange = (start: Date | null, end: Date | null) => {
    if (start && end) {
      return `${start.toLocaleString("en-US", {
        month: "short",
      })} ${String(start.getDate()).padStart(2, "0")} - ${end.toLocaleString(
        "en-US",
        {
          month: "short",
        }
      )} ${String(end.getDate()).padStart(2, "0")}`;
    }
    return "";
  };

  return (
    <div
      className={`flex justify-between items-center w-full  bg-white  py-3 px-5 mb-2   ${className} `}
    >
      {userFullName ? (
        <div>
          <h2 className="text-3xl font-bold line-clamp-1">
            {`Hello, ${userFullName}!`}
          </h2>
          <p className="text-grayText text-lg line-clamp-1">
            Explore Marketplace Information and activity
          </p>
        </div>
      ) : null}

      <div className="flex gap-2 border border-grayLightBody rounded-md items-center pr-2">
        <div className="flex gap-4">
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
        <div className="rounded-r-md flex items-center relative w-[170px] ">
          <div
            className="flex items-center gap-2"
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          >
            <CalendarMainSVG />
            {startDate && endDate && !isDatePickerOpen ? (
              <span>{formatDateRange(startDate, endDate)}</span>
            ) : (
              <span>Select a date range</span>
            )}
          </div>

          {isDatePickerOpen && (
            <div className="absolute   z-10 top-[135%] left-[-35%]  !bg-[#fafafb]  placeholder:!bg-[#fafafb] ">
              <DatePicker
                placeholderText="Select a date range"
                className="focus:outline-none text-center"
                selected={startDate}
                onChange={onDateRangeChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange={true}
                dateFormat={"dd/MM/yyyy"}
                maxDate={maxDate as Date} // Limit range to max 31 days
                isClearable={true}
                inline={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePickerWithMonthSelect;
