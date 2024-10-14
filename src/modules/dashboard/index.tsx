import React, { useState } from "react";
import RevenueProfitChart from "./components/RevenueProfitChart";
import DatePickerWithMonthSelect from "./components/GlobalDatePicker";
import RevenueProfitDonutChart from "./components/RevenueProfitDonutChart";
import LogoAmazon from "/images/Amazon_logo.png";
import WorldMap from "/images/mapWorld.png";
import {
  CategoryBtnIcon,
  ListedIcon,
  SalesIcon,
  SoldIcon,
  SortIcon,
} from "@/assets/Svg";
import SelectField from "@/components/form-fields/components/SelectField";
import { Options } from "@/components/form-fields/components/SelectCategory";
import Button from "@/components/form-fields/components/Button";
import ProgressBar from "@/components/common/ProgressBar";

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
      <section className="w-full bg-white   py-3 px-5 mb-2  ">
        <p className="text-lg font-medium  ">Connect Your Marketplace</p>
        <div className="grid grid-cols-12 gap-x-4  gap-y-4 w-full  max-h-[73px] overflow-y-auto scroll-design">
          <div className="bg-grayLightBody/5 col-span-6 xl:col-span-3 flex justify-between   items-center p-5 w-full gap-4">
            <img
              src={LogoAmazon}
              className=" max-w-[60px] lg:max-w-[85px] xl:max-w-[115px] max-h-[40px] w-full h-full object-contain  "
              alt=""
            />
            <span className="inline-flex items-center px-4 gap-2  bg-green-600/10 border border-green-500 text-sm  rounded-full py-1 text-green-500">
              <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-green-500 ">
                &nbsp;
              </span>
              CONNECTED
            </span>
          </div>
          <div className="bg-grayLightBody/5 col-span-6 xl:col-span-3 flex justify-between items-center  p-5  w-full gap-4">
            <img
              src={LogoAmazon}
              className=" max-w-[60px] lg:max-w-[85px] xl:max-w-[115px] max-h-[40px] w-full h-full object-contain  "
              alt=""
            />
            <span className="inline-flex items-center px-4 gap-2  bg-green-600/10 border border-green-500 text-sm  rounded-full py-1 text-green-500">
              <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-green-500 ">
                &nbsp;
              </span>
              CONNECTED
            </span>
          </div>
          <div className="bg-grayLightBody/5 col-span-6 xl:col-span-3 flex justify-between  items-center p-5  w-full gap-4">
            <img
              src={LogoAmazon}
              className=" max-w-[60px] lg:max-w-[85px] xl:max-w-[115px] max-h-[40px] w-full h-full object-contain  "
              alt=""
            />
            <span className="inline-flex items-center px-4 gap-2  bg-green-600/10 border border-green-500 text-sm  rounded-full py-1 text-green-500">
              <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-green-500 ">
                &nbsp;
              </span>
              CONNECTED
            </span>
          </div>
          <div className="bg-grayLightBody/5 col-span-6 xl:col-span-3 flex justify-between  items-center p-5 w-full gap-4 relative  ">
            <div className="absolute inset-0 bg-grayLightBody/50 backdrop-blur-sm flex justify-center items-center text-[22px] font-medium z-0  rounded-md  ">
              Coming Soon
            </div>
            <img
              src={LogoAmazon}
              className=" max-w-[60px] lg:max-w-[85px] xl:max-w-[115px] max-h-[40px] w-full h-full object-contain  "
              alt=""
            />
            <span className="inline-flex items-center px-4 gap-2  bg-grayText/10   text-sm  rounded-full py-1 text-grayText border border-grayText ">
              <span className="inline-block min-w-2 w-2 h-2 rounded-full bg-grayText ">
                &nbsp;
              </span>
              NOT&nbsp;CONNECTED
            </span>
          </div>
        </div>
      </section>
      <section className=" w-full bg-white  p-5 mb-5 max-h-[calc(100vh_-_365px)] lg:max-h-[calc(100vh_-_350px)] overflow-y-auto scroll-design ">
        <div className="flex gap-6 justify-between flex-wrap items-center  pb-1">
          <h3 className="font-medium text-[26px] ">Analytics</h3>
          <Button
            btnName="Filter by Marketplace"
            btnClass="bg-white !w-auto !text-grayText flex gap-2  border !border-grayLightBody"
            BtnIconLeft={
              <CategoryBtnIcon className="w-5 h-5 min-w-5 text-grayText" />
            }
          />
        </div>
        <div className="grid grid-cols-12 lg:gap-x-4 gap-y-4 mb-5 ">
          <div className=" w-full h-full col-span-12 lg:col-span-9 border p-5 relative rounded-md ">
            {/* <div className="absolute inset-0 bg-grayLightBody/50 backdrop-blur-sm flex justify-center items-center text-[22px] font-medium z-10  rounded-md  ">
              Coming Soon
            </div> */}

            <RevenueProfitChart startDate={startDate} endDate={endDate} />
          </div>
          <div className="flex flex-col    w-full h-full col-span-12 lg:col-span-3 border p-5 relative  rounded-md ">
            {/* <div className="absolute inset-0 bg-grayLightBody/50 backdrop-blur-sm flex justify-center items-center text-[22px] font-medium z-10  rounded-md  ">
              Coming Soon
            </div> */}

            <RevenueProfitDonutChart startDate={startDate} endDate={endDate} />
          </div>
        </div>
        <div className="grid grid-cols-12 border mb-5  rounded-md  p-5">
          <div className=" col-span-12 xl:col-span-4 xl:pr-5  ">
            <div className="flex justify-between items-center pb-4 ">
              <p className="text-grayText text-base">Number of Sold Items</p>
              <div>
                <SoldIcon />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold ">90,420</p>
              <div className="bg-yellow/20 text-yellow text-sm py-1 px-2 rounded-md  font-semibold ">
                {" "}
                +20%{" "}
              </div>
            </div>
          </div>
          <div className=" col-span-12 xl:col-span-4 xl:border-l xl:border-r xl:border-t-0 xl:border-b-0 border-t border-b xl:px-5 xl:my-0 my-5 xl:py-0 py-5">
            {" "}
            <div className="flex justify-between items-center pb-4 ">
              <p className="text-grayText text-base">Number of Listed Items</p>
              <div>
                <ListedIcon />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold ">21,500</p>
              <div className="bg-yellow/20 text-yellow text-sm py-1 px-2 rounded-md font-semibold ">
                {" "}
                +20%{" "}
              </div>
            </div>{" "}
          </div>
          <div className=" col-span-12 xl:col-span-4 xl:pl-5">
            {" "}
            <div className="flex justify-between items-center pb-4 ">
              <p className="text-grayText text-base">Average Sale Price</p>
              <div>
                <SalesIcon />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold ">$11,840</p>
              <div className="bg-redAlert/20 text-redAlert text-sm py-1 px-2 rounded-md  font-semibold ">
                {" "}
                +20%{" "}
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="grid grid-cols-11 gap-4 mb-5">
          <div className="flex justify-center items-center w-full h-full col-span-11 lg:col-span-5 border  rounded-md p-4 relative">
            <div className="absolute inset-0 bg-grayLightBody/50 backdrop-blur-sm flex justify-center items-center text-[22px] font-medium z-10  rounded-md  ">
              Coming Soon
            </div>
            <img src={WorldMap} alt="" />
          </div>
          <div className="flex flex-col justify-center   w-full h-full col-span-6 lg:col-span-3 border  rounded-md p-4 ">
            <h3 className="text-xl font-bold mb-4">Top Selling Category</h3>
            <ProgressBar Progress="45%" LabelName="Computers" />
            <ProgressBar Progress="45%" LabelName="Computers" />
            <ProgressBar Progress="45%" LabelName="Computers" />
            <ProgressBar Progress="45%" LabelName="Computers" />
            <ProgressBar Progress="45%" LabelName="Computers" />
          </div>
          <div className="flex flex-col justify-center  w-full h-full col-span-5 lg:col-span-3 border  rounded-md p-4 ">
            <h3 className="text-xl font-bold mb-4">Top Selling Sub-Category</h3>
            <ProgressBar Progress="45%" LabelName="Computers" />
            <ProgressBar Progress="45%" LabelName="Computers" />
            <ProgressBar Progress="45%" LabelName="Computers" />
            <ProgressBar Progress="45%" LabelName="Computers" />
            <ProgressBar Progress="45%" LabelName="Computers" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
