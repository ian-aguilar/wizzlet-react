import { Link } from "react-router-dom";
import { SettingsProfileIcon, SettingsPWDIcon } from "@/assets/Svg";
import { TextLabel } from "@/components/common/TextLabel";
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/form-fields/components/Button";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
}

const Dashboard = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    console.log("Sssssssssssss", data);
  };

  const settingsNav = [
    {
      navIcon: <SettingsProfileIcon />,
      navText: "Profile",
      navClass:
        "text-blackPrimary font-medium relative before:absolute before:top-0  before:bottom-0  before:right-[-2px]  before:w-[3px]  before:h-full  before:bg-greenPrimary  ",
    },
    {
      navIcon: <SettingsPWDIcon />,
      navText: "Change Password",
      navClass: "  text-grayText font-medium ",
    },
  ];

  return (
    <>
      <article className="dashboardRight w-full h-full bg-authPattern bg-[length:30px_30px] p-5">
        <h2 className="text-blackPrimary font-bold text-3xl pb-2">Settings</h2>
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

              {/* <ModalCommon /> */}

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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="SettingsContentBox lg:pr-24 xl:pr-72 ">
                  <div className="grid grid-cols-12 lg:gap-4">
                    <div className=" col-span-12 lg:col-span-6">
                      {" "}
                      <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: "First name is required" }} // Add validation rules
                        render={({ field }) => (
                          <TextLabel
                            TextClass=""
                            TextLabelName="First Name"
                            TextPlaceHolder="First Name"
                            control={control}
                            errors={errors}
                            type="text"
                            autoComplete="off"
                            {...field}
                          />
                        )}
                      />
                    </div>
                    <div className=" col-span-12 lg:col-span-6">
                      <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: "Last name is required" }} // Add validation rules
                        render={({ field }) => (
                          <TextLabel
                            TextClass=" "
                            TextLabelName="Last Name"
                            TextPlaceHolder="Last Name"
                            control={control}
                            errors={errors}
                            type="text"
                            autoComplete="off"
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <TextLabel
                        TextClass=""
                        TextLabelName="Default Email "
                        TextPlaceHolder="Default Email "
                        control={control}
                        errors={errors}
                        type="text"
                        autoComplete="off"
                        {...field}
                      />
                    )}
                  />
                  <div className="text-sm text-grayText  ">
                    Do you want to change email?
                    <Link
                      to=""
                      className="font-medium cursor-pointer text-greenPrimary inline-block ml-2 hover:underline hover:underline-offset-2 hover:brightness-110 transition-all duration-300 hover:transition-all hover:duration-300"
                    >
                      Change
                    </Link>
                  </div>
                  <div className="pt-14">
                    <Button btnClass=" !w-auto !px-14 " btnName="Update" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Dashboard;
