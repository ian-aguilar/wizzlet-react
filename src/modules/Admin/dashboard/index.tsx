import {
  ActiveUserAdminSVG,
  InActiveUserAdminSVG,
  TotalMarketplaceAdminSVG,
  TotalUSerAdminSVG,
} from "@/assets/Svg";

const AdminDashboard = () => {
  return (
    <>
      <section className="AdminDashboard h-full w-full bg-white overflow-y-auto scroll-design p-5 ">
        <h2 className="font-bold text-3xl text-black">Dashboard</h2>
        <p className="text-grayText text-base pb-7">
          <span className="font-semibold"> Hello, Admin! </span> Here’s take a
          look at your Analytics.
        </p>
        <article className="adminDashboardCounters grid grid-cols-12 gap-x-4 gap-y-4 mb-3">
          <div className=" col-span-6  xl:col-span-3 border border-greyBorder rounded-md bg-white flex items-center w-full p-5 gap-4">
            <TotalUSerAdminSVG className="w-[74px] h-[74px] min-w-[74px] " />
            <div className="w-full">
              <div className="font-bold text-3xl text-black">24.4k</div>
              <p className="text-base text-grayText">Total Users</p>
            </div>
          </div>
          <div className=" col-span-6  xl:col-span-3 border border-greyBorder rounded-md bg-white flex items-center w-full p-5 gap-4">
            <TotalMarketplaceAdminSVG className="w-[74px] h-[74px] min-w-[74px] " />
            <div className="w-full">
              <div className="font-bold text-3xl text-black">278</div>
              <p className="text-base text-grayText">Total Marketplace</p>
            </div>
          </div>
          <div className=" col-span-6  xl:col-span-3 border border-greyBorder rounded-md bg-white flex items-center w-full p-5 gap-4">
            <ActiveUserAdminSVG className="w-[74px] h-[74px] min-w-[74px] " />
            <div className="w-full">
              <div className="font-bold text-3xl text-black">65k</div>
              <p className="text-base text-grayText">Active Users</p>
            </div>
          </div>
          <div className=" col-span-6  xl:col-span-3 border border-greyBorder rounded-md bg-white flex items-center w-full p-5 gap-4">
            <InActiveUserAdminSVG className="w-[74px] h-[74px] min-w-[74px] " />
            <div className="w-full">
              <div className="font-bold text-3xl text-black">10k</div>
              <p className="text-base text-grayText">Inactive Users</p>
            </div>
          </div>
        </article>
        <article className="grid grid-cols-12 gap-y-3 lg:gap-x-3 ">
          <div className="bg-grayLightBody/5 p-5 rounded-md col-span-12 lg:col-span-4 ">
            Today’s Users ( ProgressBar )
          </div>
          <div className="bg-grayLightBody/5 p-5 rounded-md col-span-12 lg:col-span-8 ">
            revenue by location ( WorldChart )
          </div>
          <div className="bg-grayLightBody/5 p-5 rounded-md col-span-12 lg:col-span-8 ">
            Marketplace Activity / ( BarChart )
          </div>
          <div className="bg-grayLightBody/5 p-5 rounded-md col-span-12 lg:col-span-4 ">
            Categories ( LineChart )
          </div>
        </article>
      </section>
    </>
  );
};

export default AdminDashboard;
