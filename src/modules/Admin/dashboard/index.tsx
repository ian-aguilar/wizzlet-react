import {
  ActiveUserAdminSVG,
  InActiveUserAdminSVG,
  TotalMarketplaceAdminSVG,
  TotalUSerAdminSVG,
} from "@/assets/Svg";
import UserProgressComponent from "./components/UserProgressComponent";
import MarketplaceActivityChart from "./components/AdminChartMarketplaceActivity";
import CategoriesProgress from "./components/CategoriesProgressComponent";
import CategoryUsedChart from "./components/AdminCategoryUsedChart";
import MapImg from "/images/worldMapAdmin.png";
import { useEffect, useState } from "react";
import {
  useGetAdminDashboardCategoryDataApi,
  useGetAdminDashboardUserDataDataApi,
  useGetDashboardRevenueDataApi,
} from "./service/adminDashboard.service";
import { AdminDashboardData, CategoryData, UserData } from "./types";
import Select, { MultiValue, SingleValue } from "react-select";
import { CategoriesProgressDropDownOptions } from "./constants";
import { OptionType, RevenueMarketDetail } from "@/modules/dashboard/types";
import { capitalizeFirstLetter } from "@/modules/choose-marketplace/helper";
import { useMarketplaceListingAPI } from "@/modules/marketplace/services/marketplace.service";
import DatePickerWithMonthSelect from "@/modules/dashboard/components/GlobalDatePicker";

const AdminDashboard = () => {
  const currentDate = new Date();

  // Set the first day of the current month
  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  //-----------------States---------------------------
  const [userData, setUserData] = useState<UserData>({
    activeUsers: 0,
    inactiveUsers: 0,
    totalUsers: 0,
    totalMarketplace: 0,
    todaysUsers: 0,
  });

  const [selectedOptions, setSelectedOptions] = useState<
    SingleValue<{
      label: string;
      value: number;
    }>
  >(null);

  const [categoryData, setCategoryData] = useState<CategoryData>({
    usedCategories: "",
    usedCategoriesPercentage: 0,
  });

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  const [startDate, setStartDate] = useState<Date | null>(
    firstDayOfCurrentMonth || null
  );

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [endDate, setEndDate] = useState<Date | null>(currentDate || null);

  const [selectedMarketplaceOptions, setSelectedMarketplaceOptions] = useState<
    MultiValue<OptionType> | undefined
  >([]);

  const [connectedMarketplace, setConnectedMarketplace] =
    useState<OptionType[]>();

  const [mainData, setMainData] = useState<AdminDashboardData>({
    revenueMarketDetails: [],
  });

  //-------------Custom Hooks-----------------------
  const { getAdminDashboardUserDataDataApi } =
    useGetAdminDashboardUserDataDataApi();

  const { getAdminDashboardCategoryDataApi } =
    useGetAdminDashboardCategoryDataApi();

  const { getMarketplaceListingAPI } = useMarketplaceListingAPI();

  const { getDashboardRevenueDataApi } = useGetDashboardRevenueDataApi();

  const handleUserData = async () => {
    const { data, error } = await getAdminDashboardUserDataDataApi();
    if (data && !error) {
      setUserData({
        activeUsers: data?.data?.activeUsers,
        inactiveUsers: data?.data?.inactiveUsers,
        totalUsers: data?.data?.activeUsers + data?.data?.inactiveUsers,
        todaysUsers: data?.data?.todaysUsers,
        totalMarketplace: data?.data?.totalMarketplace,
      });
    }
  };

  const handleCategoryData = async () => {
    const { data, error } = await getAdminDashboardCategoryDataApi(
      selectedOptions ? selectedOptions?.value : null
    );
    if (data && !error) {
      setCategoryData({
        usedCategories: data?.data?.usedCategories,
        usedCategoriesPercentage: data?.data?.usedCategoriesPercentage,
      });
    }
  };

  const handleChange = (
    newValue: SingleValue<{
      label: string;
      value: number;
    }>
  ) => {
    setSelectedOptions(newValue);
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Close the calendar once the range is selected
    if (start && end) {
      setIsDatePickerOpen(false);
    }
  };

  const handleMarketplaceChange = (newValue: MultiValue<OptionType>) => {
    setSelectedMarketplaceOptions(newValue);
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
  };

  const marketplaceListing = async () => {
    const { data, error } = await getMarketplaceListingAPI({});
    if (!error && data) {
      const options = data?.data?.notConnectedMarketplace
        .filter(
          (e: {
            id: number;
            name: string;
            coming_soon: boolean;
            logo: string;
          }) => !e?.coming_soon
        )
        .map(
          (item: {
            id: number;
            name: string;
            coming_soon: boolean;
            logo: string;
          }) => {
            return {
              label: capitalizeFirstLetter(item?.name),
              value: item?.id,
            };
          }
        );
      setConnectedMarketplace(options);
    }
  };

  // Function to handle the API call for /getAllData
  const fetchAllData = async (start: Date, end: Date) => {
    try {
      const marketplaceIds =
        selectedMarketplaceOptions?.map((option) => option.value) || null;

      const { data, error } = await getDashboardRevenueDataApi(
        start.toLocaleDateString("en-CA"),
        end.toLocaleDateString("en-CA"),
        marketplaceIds
      );
      if (data && !error) {
        console.log("🚀 ~ fetchAllData ~ data:", data);
        setMainData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    marketplaceListing();
    handleUserData();
  }, []);

  useEffect(() => {
    handleCategoryData();
  }, [selectedOptions]);

  // Effect to call fetchAllData when startDate or endDate changes
  useEffect(() => {
    if (startDate && endDate) {
      fetchAllData(startDate, endDate);
    }
  }, [startDate, endDate, selectedOptions]);

  return (
    <>
      <section className="AdminDashboard h-full w-full bg-white overflow-y-auto scroll-design p-5 ">
        <h2 className="font-bold text-3xl text-black">Dashboard</h2>
        <p className="text-grayText text-base pb-7">
          <span className="font-semibold"> Hello, Admin! </span> Here’s take a
          look at your Analytics.
        </p>
        <article className="adminDashboardCounters grid grid-cols-12 gap-x-4 gap-y-4 mb-3">
          <div className=" col-span-6  xl:col-span-3 border border-greyBorder/50 rounded-md bg-white flex items-center w-full p-5 gap-4">
            <TotalUSerAdminSVG className="w-[74px] h-[74px] min-w-[74px] " />
            <div className="w-full">
              <div className="font-bold text-3xl text-black">
                {userData?.totalUsers}
              </div>
              <p className="text-base text-grayText">Total Users</p>
            </div>
          </div>
          <div className=" col-span-6  xl:col-span-3 border border-greyBorder/50 rounded-md bg-white flex items-center w-full p-5 gap-4">
            <TotalMarketplaceAdminSVG className="w-[74px] h-[74px] min-w-[74px] " />
            <div className="w-full">
              <div className="font-bold text-3xl text-black">
                {userData?.totalMarketplace}
              </div>
              <p className="text-base text-grayText">Total Marketplace</p>
            </div>
          </div>
          <div className=" col-span-6  xl:col-span-3 border border-greyBorder/50 rounded-md bg-white flex items-center w-full p-5 gap-4">
            <ActiveUserAdminSVG className="w-[74px] h-[74px] min-w-[74px] " />
            <div className="w-full">
              <div className="font-bold text-3xl text-black">
                {userData?.activeUsers}
              </div>
              <p className="text-base text-grayText">Active Users</p>
            </div>
          </div>
          <div className=" col-span-6  xl:col-span-3 border border-greyBorder/50 rounded-md bg-white flex items-center w-full p-5 gap-4">
            <InActiveUserAdminSVG className="w-[74px] h-[74px] min-w-[74px] " />
            <div className="w-full">
              <div className="font-bold text-3xl text-black">
                {userData?.inactiveUsers}
              </div>
              <p className="text-base text-grayText">Inactive Users</p>
            </div>
          </div>
        </article>
        <article className="grid grid-cols-12 gap-y-3 lg:gap-x-3 ">
          <div className="bg-grayLightBody/5 p-5 rounded-md col-span-12 lg:col-span-4 ">
            <UserProgressComponent
              todaysUsers={userData?.todaysUsers}
              onlineUsers={0}
              offlineUsers={0}
            />
          </div>
          <div className="bg-grayLightBody/5 p-5 rounded-md col-span-12 lg:col-span-8 relative">
            <div className="absolute z-0 inset-0 bg-grayLightBody/50 backdrop-blur-sm flex justify-center items-center text-[22px] font-medium  rounded-md  ">
              Coming Soon
            </div>
            <img src={MapImg} alt="" />
          </div>
          <div className="bg-grayLightBody/5 p-5 rounded-md col-span-12 lg:col-span-8 ">
            <div className="flex justify-between gap-4 pb-6 items-center w-full flex-wrap">
              <h3 className="text-xl font-medium text-blackPrimary whitespace-nowrap">
                Marketplace Activity
              </h3>
              <div className="ml-auto flex gap-4 items-center">
                <Select
                  className="!w-[300px]"
                  isMulti
                  value={selectedMarketplaceOptions}
                  onChange={handleMarketplaceChange}
                  options={connectedMarketplace}
                  placeholder="Filter By Marketplace"
                />
                <DatePickerWithMonthSelect
                  className="!bg-transparent !p-0 !w-auto !mb-0 pr-20"
                  selectedMonth={selectedMonth}
                  startDate={startDate}
                  endDate={endDate}
                  onMonthChange={handleMonthChange}
                  onDateRangeChange={handleDateRangeChange}
                  isDatePickerOpen={isDatePickerOpen}
                  setIsDatePickerOpen={setIsDatePickerOpen}
                />
              </div>
            </div>
            <MarketplaceActivityChart
              startDate={startDate}
              endDate={endDate}
              data={mainData?.revenueMarketDetails}
              selectedMarketplace={selectedMarketplaceOptions}
            />
          </div>
          <div className="bg-grayLightBody/5 p-5 rounded-md col-span-12 lg:col-span-4 ">
            <div className="headerText flex justify-between pb-14 items-center">
              <h3 className="text-xl font-medium text-blackPrimary ">
                Categories
              </h3>
              <Select
                className="w-[200px]"
                value={selectedOptions}
                onChange={handleChange}
                options={CategoriesProgressDropDownOptions}
                placeholder="Filter"
              />
            </div>
            <CategoriesProgress
              categoryPercentage={categoryData?.usedCategoriesPercentage}
              // subCategoryPercentage={30}
              categoriesUsed={categoryData?.usedCategories}
              // subCategoriesUsed={211348}
            />
            <div className=" ">
              <CategoryUsedChart />
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default AdminDashboard;
