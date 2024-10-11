import React, { useState } from "react";
import RevenueProfitChart from "./components/RevenueProfitChart";
import DatePickerWithMonthSelect from "./components/GlobalDatePicker";
import RevenueProfitDonutChart from "./components/RevenueProfitDonutChart";

const Dashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("December");
  const [startDate, setStartDate] = useState<Date>(new Date("2024-12-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2024-12-31"));

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);

    const year = 2024; // Static year for simplicity
    const monthIndex = new Date(`${selectedMonth} 1, ${year}`).getMonth();
    setStartDate(new Date(year, monthIndex, 1));
    setEndDate(new Date(year, monthIndex + 1, 0));
  };

  return (
    <>
      <DatePickerWithMonthSelect
        selectedMonth={selectedMonth}
        startDate={startDate}
        endDate={endDate}
        onMonthChange={handleMonthChange}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <RevenueProfitChart startDate={startDate} endDate={endDate} />
      <RevenueProfitDonutChart startDate={startDate} endDate={endDate} />
    </>
  );
};

export default Dashboard;
