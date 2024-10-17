import {
  LeftArrowIcon,
  ListedIcon,
  ProfilePlaceholderSVG,
  SalesIcon,
  SoldIcon,
} from "@/assets/Svg";
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
import ProfileImg from "/images/profile-placeholder.png";
import { InputSwitch } from "@/components/common/InpiutSwitch";
import { selectedMarketplaceStyle } from "@/modules/import-products/constants";

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
    <div className="h-full">
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
      <section className=" w-full bg-white flex gap-4 p-5 mb-5   max-h-[calc(100%_-_50px)] overflow-y-auto scroll-design items-start relative">
        <div className="min-w-[310px] w-[310px] bg-blackPrimary text-white sticky top-0 rounded-md py-10 px-7 text-center">
          <img
            src={ProfileImg}
            className="mx-auto w-24 h-24 min-w-24 rounded-full object-cover object-center"
            alt=""
          />
          <h3 className="font-bold text-xl text-white text-center pt-10 ">
            Eleanor Pena
          </h3>
          <p className="text-base text-white text-center break-all">
            willie.jennings@example.com
          </p>
          <div className="flex justify-center gap-2 text-white items-center pt-5 ">
            <InputSwitch className="bg-white rounded-full" /> Inactive
          </div>
        </div>
        <div className="w-[calc(100%_-_330px)] max-w-full ">
          <div className="flex gap-4 flex-wrap justify-between px-5 py-3 items-center bg-grayLightBody/20">
            <h3 className="text-2xl font-medium text-blackPrimary">
              Marketplaces
            </h3>
            <Select
              isMulti
              value={selectedOptions}
              onChange={handleChange}
              options={connectedMarketplace}
              placeholder="Filter By Marketplace"
              styles={selectedMarketplaceStyle}
            />
          </div>
          <div className=" px-5 py-3 bg-grayLightBody/5">
            <div className="flex gap-6 justify-between flex-wrap items-center pb-4 ">
              <h3 className="font-medium text-[26px] ">Analytics</h3>
              {/* <div className="flex  ">
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
            </div> */}
            </div>
            <div className="grid grid-cols-12 lg:gap-x-4 gap-y-4 mb-5 ">
              <div className=" w-full h-full col-span-12 lg:col-span-6  ">
                <div className="grid grid-cols-12  ">
                  <div className=" col-span-12  bg-white  px-5 py-2 mb-4 border border-grayLightBody/20 rounded-md ">
                    <div className="flex justify-between items-center pb-4 ">
                      <p className="text-grayText text-base">
                        Number of Sold Items
                      </p>
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
                  <div className=" col-span-12  bg-white px-5 py-2 mb-4 border border-grayLightBody/20 rounded-md ">
                    {" "}
                    <div className="flex justify-between items-center pb-4 ">
                      <p className="text-grayText text-base">
                        Number of Listed Items
                      </p>
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
                  <div className=" col-span-12  bg-white px-5 py-2  border border-grayLightBody/20 rounded-md ">
                    {" "}
                    <div className="flex justify-between items-center pb-4 ">
                      <p className="text-grayText text-base">
                        Average Sale Price
                      </p>
                      <div>
                        <SalesIcon />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-3xl font-bold ">
                        $
                        {Number(
                          mainData?.saleDetails[0]?.averageSalePrice
                        ).toFixed(2)}
                      </p>
                      <div className="bg-redAlert/20 text-redAlert text-sm py-1 px-2 rounded-md  font-semibold ">
                        {" "}
                        +20%{" "}
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
              <div className="flex flex-col    w-full h-full col-span-12 lg:col-span-6  bg-white  px-5 py-2 mb-4 border border-grayLightBody/20 rounded-md ">
                <RevenueProfitDonutChart
                  connectedMarketplace={marketplace?.connectedMarketplace}
                  revenueData={mainData?.revenueMarketDetails}
                  selectedMarketplace={selectedOptions}
                />
              </div>
            </div>
            <div className=" bg-white  px-5 py-2 mb-4 border border-grayLightBody/20 rounded-md">
              <RevenueProfitChart
                startDate={startDate}
                endDate={endDate}
                totalRevenue={mainData?.totalRevenue}
                data={mainData?.revenueMarketDetails}
                selectedMarketplace={selectedOptions}
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mb-5 ">
              <div className="flex flex-col w-full h-full col-span-12 bg-white  border  rounded-md p-4 ">
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

              {/* <div className="flex flex-col   w-full h-full col-span-12  lg:col-span-6 bg-white border  rounded-md p-4 ">
            <h3 className="text-xl font-bold mb-4">Top Selling Sub-Category</h3>
            <ProgressBar Progress="45" LabelName="Computers" />
            <ProgressBar Progress="45" LabelName="Computers" />
            <ProgressBar Progress="45" LabelName="Computers" />
            <ProgressBar Progress="45" LabelName="Computers" />
            <ProgressBar Progress="45" LabelName="Computers" />
          </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewUser;
