import { LeftArrowIcon, ListedIcon, SalesIcon, SoldIcon } from "@/assets/Svg";
import ProgressBar from "@/components/common/ProgressBar";
import { PrivateRoutesPath } from "@/modules/Auth/types";
import { capitalizeFirstLetter } from "@/modules/choose-marketplace/helper";
import DatePickerWithMonthSelect from "@/modules/dashboard/components/GlobalDatePicker";
import RevenueProfitChart from "@/modules/dashboard/components/RevenueProfitChart";
import RevenueProfitDonutChart from "@/modules/dashboard/components/RevenueProfitDonutChart";
import { useGetAllDashboardDataApi } from "@/modules/dashboard/services/dashboard.service";
import {
  DashboardData,
  OptionType,
  RevenueMarketDetail,
} from "@/modules/dashboard/types";
import { useMarketplaceListingAPI } from "@/modules/marketplace/services/marketplace.service";
import { IMarketplace } from "@/modules/marketplace/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select, { MultiValue } from "react-select";

const ViewUser = () => {
  const currentDate = new Date();

  // Set the first day of the current month
  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<OptionType> | undefined
  >([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  const [connectedMarketplace, setConnectedMarketplace] =
    useState<OptionType[]>();
  const [startDate, setStartDate] = useState<Date | null>(
    firstDayOfCurrentMonth || null
  );

  const [userFullName, setUserFullName] = useState<string>("");

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [endDate, setEndDate] = useState<Date | null>(currentDate || null);

  const [marketplace, setMarketplace] = useState<{
    connectedMarketplace: IMarketplace[];
    notConnectedMarketplace: IMarketplace[];
  }>({ connectedMarketplace: [], notConnectedMarketplace: [] });

  const [mainData, setMainData] = useState<DashboardData>({
    listedDetails: [],
    saleDetails: [],
    TopSoldCategories: [],
    revenueMarketDetails: [],
    totalRevenue: 0, // Initialize with 0
  });

  const { userId } = useParams();
  const navigate = useNavigate();

  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();
  const { getAllDashboardDataAPI } = useGetAllDashboardDataApi();

  const handleChange = (newValue: MultiValue<OptionType>) => {
    setSelectedOptions(newValue);
  };

  useEffect(() => {
    marketplaceListing();
  }, []);

  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({
      userId: userId,
    });
    if (!error && data) {
      setMarketplace(data?.data);
      setUserFullName(data?.data?.userFullName);
      console.log("data?.data?.connectedMarketplace: ", data?.data);
      const options = data?.data?.connectedMarketplace.map(
        (e: {
          id: number;
          name: string;
          coming_soon: boolean;
          logo: string;
        }) => {
          return {
            label: capitalizeFirstLetter(e?.name),
            value: e?.id,
          };
        }
      );
      setConnectedMarketplace(options);
    }
  };
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);

    const year = currentDate.getFullYear(); // Static year for simplicity
    const monthIndex = new Date(`${selectedMonth} 1, ${year}`).getMonth();
    const newStartDate = new Date(year, monthIndex, 1);
    const newEndDate = new Date(year, monthIndex + 1, 0);

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    // Fetch data when month changes
    fetchAllData(newStartDate, newEndDate);
  };

  // Function to handle the API call for /getAllData
  const fetchAllData = async (start: Date, end: Date) => {
    try {
      const marketplaceIds =
        selectedOptions?.map((option) => option.value) || null;

      const { data, error } = await getAllDashboardDataAPI(
        start.toLocaleDateString("en-CA"),
        end.toLocaleDateString("en-CA"),
        marketplaceIds,
        Number(userId)
      );
      if (data && !error) {
        // Calculate total revenue
        const totalRevenue: number = data?.data?.revenueMarketDetails.reduce(
          (acc: number, curr: RevenueMarketDetail) => acc + curr.revenue,
          0
        );
        setMainData({ ...data?.data, totalRevenue });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Effect to call fetchAllData when startDate or endDate changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchAllData(startDate, endDate);
    }
  }, [startDate, endDate, selectedOptions]);

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Close the calendar once the range is selected
    if (start && end) {
      setIsDatePickerOpen(false);
    }
  };

  // console.log("selectedOptions: ", selectedOptions);
  // console.log("marketplace: ", marketplace);
  // console.log("mainData: ", mainData);

  return (
    <div>
      <div>
        <div className="border-b border-greyBorder pb-2 mb-4 flex justify-between">
          <div className="flex gap-5">
            <div
              className="border p-2 rounded-full bg-white cursor-pointer"
              onClick={() => {
                navigate(PrivateRoutesPath.userManagement.view);
              }}
            >
              <LeftArrowIcon />
            </div>
            <h3 className="text-2xl  text-blackPrimary  font-medium">
              User Details
            </h3>
          </div>
        </div>
      </div>
      <section className=" w-full bg-white  p-5 mb-5 max-h-[calc(100vh_-_365px)] lg:max-h-[calc(100vh_-_350px)] overflow-y-auto scroll-design ">
        <div className="flex gap-6 justify-between flex-wrap items-center  pb-1">
          <h3 className="font-medium text-[26px] ">Analytics</h3>
          <div className="flex  ">
            <DatePickerWithMonthSelect
              selectedMonth={selectedMonth}
              startDate={startDate}
              endDate={endDate}
              onMonthChange={handleMonthChange}
              // userFullName={userFullName}
              onDateRangeChange={handleDateRangeChange}
              isDatePickerOpen={isDatePickerOpen}
              setIsDatePickerOpen={setIsDatePickerOpen}
            />
            <Select
              isMulti
              value={selectedOptions}
              onChange={handleChange}
              options={connectedMarketplace}
              placeholder="Filter By Marketplace"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 lg:gap-x-4 gap-y-4 mb-5 ">
          <div className=" w-full h-full col-span-12 lg:col-span-9 border p-5 relative rounded-md ">
            <RevenueProfitChart
              startDate={startDate}
              endDate={endDate}
              totalRevenue={mainData?.totalRevenue}
              data={mainData?.revenueMarketDetails}
              selectedMarketplace={selectedOptions}
            />
          </div>
          <div className="flex flex-col    w-full h-full col-span-12 lg:col-span-3 border p-5 relative  rounded-md ">
            <RevenueProfitDonutChart
              connectedMarketplace={marketplace?.connectedMarketplace}
              revenueData={mainData?.revenueMarketDetails}
              selectedMarketplace={selectedOptions}
            />
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
              <p className="text-3xl font-bold ">
                {mainData?.saleDetails[0]?.totalSoldItems
                  ? mainData?.saleDetails[0]?.totalSoldItems
                  : 0}
              </p>
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
              <p className="text-3xl font-bold ">
                {mainData?.listedDetails[0]?.listedItems}
              </p>
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
              <p className="text-3xl font-bold ">
                ${Number(mainData?.saleDetails[0]?.averageSalePrice).toFixed(2)}
              </p>
              <div className="bg-redAlert/20 text-redAlert text-sm py-1 px-2 rounded-md  font-semibold ">
                {" "}
                +20%{" "}
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="grid grid-cols-11 gap-4 mb-5">
          <div className="flex flex-col w-full h-full col-span-6 lg:col-span-6 border  rounded-md p-4 ">
            <h3 className="text-xl font-bold mb-4">Top Selling Category</h3>
            {mainData?.TopSoldCategories.length > 0 ? (
              mainData?.TopSoldCategories.map((item) => (
                <ProgressBar
                  Progress={item?.percentage}
                  LabelName={item?.categoryName}
                />
              ))
            ) : (
              <div className="text-center">No Data Found!</div>
            )}
          </div>

          {/* <div className="flex flex-col   w-full h-full col-span-5 lg:col-span-3 border  rounded-md p-4 ">
            <h3 className="text-xl font-bold mb-4">Top Selling Sub-Category</h3>
            <ProgressBar Progress="45" LabelName="Computers" />
            <ProgressBar Progress="45" LabelName="Computers" />
            <ProgressBar Progress="45" LabelName="Computers" />
            <ProgressBar Progress="45" LabelName="Computers" />
            <ProgressBar Progress="45" LabelName="Computers" />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ViewUser;
