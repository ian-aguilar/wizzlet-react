import { Link } from "react-router-dom";
import MainLogo from "/images/logo.svg";
import ProfilePlaceholder from "/images/profile-placeholder.png";
import { SearchHeader } from "@/components/common/SearchHeader";
import {
  CMSMGTIcon,
  DashboardIcon,
  EyeCloseIconSettings,
  EyeIconSettings,
  HamburgerIcon,
  MarketPlaceIcon,
  NotificationIcon,
  SettingsIcon,
  SettingsProfileIcon,
  SettingsPWDIcon,
  UserMgtIcon,
} from "@/assets/Svg";
import { TextLabel } from "@/components/common/TextLabel";
import { ButttonCommon } from "@/components/common/ButttonCommon";
import { ModalCommon } from "@/components/common/ModalCommon";
const Dashboard = () => {
  const navData = [
    {
      navIcon: <DashboardIcon />,
      navName: "Dashboard",
      navClass: "bg-greenPrimary text-white",
    },
    {
      navIcon: <UserMgtIcon />,
      navName: "User Management",
      navClass: "bg-white text-grayText",
    },
    {
      navIcon: <MarketPlaceIcon />,
      navName: "Marketplace",
      navClass: "bg-white text-grayText",
    },
    {
      navIcon: <CMSMGTIcon />,
      navName: "CMS Management",
      navClass: "bg-white text-grayText",
    },
    {
      navIcon: <SettingsIcon />,
      navName: "Settings",
      navClass: "bg-white text-grayText",
    },
  ];

  const settingsNav = [
    {
      navIcon: <SettingsProfileIcon />,
      navText: "Profile",
      navClass:
        "   text-blackPrimary font-medium relative before:absolute before:top-0  before:bottom-0  before:right-[-2px]  before:w-[3px]  before:h-full  before:bg-greenPrimary  ",
    },
    {
      navIcon: <SettingsPWDIcon />,
      navText: "Change Password",
      navClass: "  text-grayText font-medium ",
    },
  ];

  return (
    <>
      <header className="py-3 px-8 lg:px-14 flex items-center justify-between gap-8 border-b border-greyBorder">
        <div className="flex gap-4 items-center">
          <Link to="" className="lg:hidden block">
            <HamburgerIcon />{" "}
          </Link>

          <Link to="">
            <img
              src={MainLogo}
              alt="Logo"
              className="py-1 sm:min-w-[209px] sm:w-[209px] min-w-[100px] w-[100px]"
            />
          </Link>
        </div>

        <div className=" flex gap-4 items-center">
          <SearchHeader />

          <div className=" group w-14 h-14 min-w-14 rounded-full border border-greyBorder hover:bg-greenPrimary/5 flex justify-center items-center hover:brightness-110 transition-all duration-300 cursor-pointer relative">
            <div className="NotificationAlert absolute top-0 -right-0.5 w-3 h-3 min-w-3 rounded-full bg-greenPrimary group-hover:brightness-110 group-hover:transition-all group-hover:duration-300 border border-greyBorder/50 ">
              {" "}
              &nbsp;{" "}
            </div>
            <NotificationIcon />
          </div>
          <div className="rounded-full border border-greyBorder cursor-pointer">
            <img
              src={ProfilePlaceholder}
              className="w-14 h-14 min-w-14"
              alt=""
            />
          </div>
        </div>
      </header>
      <div className="w-full flex h-[calc(100vh_-_83px)]">
        <article className="LeftBar min-w-[291px] w-[291px] h-full lg:block hidden p-5">
          <div className="bg-[#F7F8FA] py-2 px-4 uppercase w-full text-grayText font-semibold mb-2">
            MENU
          </div>

          <nav className="">
            {navData.map((data, i) => (
              <Link
                className={` group font-medium w-full flex gap-2 rounded-md p-4 mb-1 hover:brightness-110 duration-300 transition-all  hover:duration-300 hover:transition-all  ${data.navClass} `}
                to=""
                key={i}
              >
                <span className="  group-hover:fill-blackPrimary">
                  {data.navIcon}
                </span>{" "}
                {data.navName}
              </Link>
            ))}
          </nav>
        </article>
        <article className="dashboardRight w-full h-full bg-authPattern bg-[length:30px_30px] p-5">
          <h2 className="text-blackPrimary font-bold text-3xl pb-2">
            Settings
          </h2>
          <section className="h-[calc(100%_-_40px)] w-full bg-white overflow-y-auto scroll-design p-7">
            <div className="SettingsSection block sm:flex sm:h-full">
              <div className="w-[200px] min-w-[200px] border-r border-greyBorder h-full py-2">
                {settingsNav.map((data, i) => (
                  <Link
                    to=""
                    key={i}
                    className={` flex gap-2 items-center w-full   mb-8 hover:brightness-125 transition-all duration-300  ${data.navClass} `}
                  >
                    {data.navIcon}
                    {data.navText}
                  </Link>
                ))}
              </div>
              <div className="w-full px-4 xl:px-20">
                <h3 className="text-2xl pb-2 text-blackPrimary border-b border-greyBorder  font-medium mb-4">
                  Change Password
                </h3>

                <ModalCommon />

                {/* <div className="SettingsContentBox lg:pr-56 xl:pr-72 ">
                  <TextLabel
                    TextClass=" "
                    TextLabelName="Old Password"
                    TextPlaceHolder="Old Password"
                    TextEndIcon={<EyeCloseIconSettings />}
                  />
                  <TextLabel
                    TextClass=" "
                    TextLabelName="New Password"
                    TextPlaceHolder="New Password"
                    TextEndIcon={<EyeIconSettings />}
                  />
                  <TextLabel
                    TextClass=" "
                    TextLabelName="Re-type new Password"
                    TextPlaceHolder="Re-type new Password"
                    TextEndIcon={<EyeIconSettings />}
                  />
                  <div className="pt-14">
                    <ButttonCommon
                      BtnClass=" !w-auto !px-14 "
                      BtnName="Update"
                    />
                  </div>
                </div> */}
                <div className="SettingsContentBox lg:pr-24 xl:pr-72 ">
                  <div className="grid grid-cols-12 lg:gap-4">
                    <div className=" col-span-12 lg:col-span-6">
                      {" "}
                      <TextLabel
                        TextClass=" "
                        TextLabelName="First Name"
                        TextPlaceHolder="First Name"
                        TextEndIcon={<EyeCloseIconSettings />}
                      />{" "}
                    </div>
                    <div className=" col-span-12 lg:col-span-6">
                      {" "}
                      <TextLabel
                        TextClass=" "
                        TextLabelName="Last Name"
                        TextPlaceHolder="Last Name"
                        TextEndIcon={<EyeIconSettings />}
                      />{" "}
                    </div>
                  </div>

                  <TextLabel
                    TextClass=" "
                    TextLabelName="Default Email "
                    TextPlaceHolder="Default Email "
                    TextEndIcon={<EyeIconSettings />}
                  />

                  <div className="text-sm text-grayText  ">
                    Do you want to change email?
                    <Link className="font-medium cursor-pointer text-greenPrimary inline-block ml-2 hover:underline hover:underline-offset-2 hover:brightness-110 transition-all duration-300 hover:transition-all hover:duration-300">
                      Change
                    </Link>
                  </div>

                  <div className="pt-14">
                    <ButttonCommon
                      BtnClass=" !w-auto !px-14 "
                      BtnName="Update"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </>
  );
};

export default Dashboard;
