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
  return (
    <div
      className={`flex justify-between items-center w-full bg-white   py-3 px-5 mb-2  pr-10 ${className} `}>
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

        <div className="rounded-r-md flex items-center">
          <div
            className="flex items-center gap-2"
            onClick={() => setIsDatePickerOpen((prev: boolean) => !prev)}>
            {!isDatePickerOpen ? (
              <>
                <CalendarMainSVG />
                {startDate && endDate ? (
                  <span>
                    {`${startDate.toLocaleString("en-US", {
                      month: "short",
                    })} ${String(startDate.getDate()).padStart(
                      2,
                      "0"
                    )} - ${endDate.toLocaleString("en-US", {
                      month: "short",
                    })} ${String(endDate.getDate()).padStart(2, "0")}`}
                  </span>
                ) : null}
              </>
            ) : null}
          </div>

          {isDatePickerOpen && (
            <DatePicker
              className="focus:outline-none text-center"
              selected={startDate}
              onChange={onDateRangeChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange={true}
              inline={false}
              dateFormat={"dd/MM/yyyy"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePickerWithMonthSelect;
