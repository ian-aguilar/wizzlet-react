// ** packages **
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

// ** common components **
import Button from "@/components/form-fields/components/Button";
import { TextLabel } from "@/components/common/TextLabel";

// **  types **
import { IFormInputs } from "../types";

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    console.log("first");
    console.log("setting sidebar", data);
  };

  return (
    <>
      <div className="w-full px-4 xl:px-20">
        <h3 className="text-2xl pb-2 text-blackPrimary border-b border-greyBorder  font-medium mb-4">
          Change Password
        </h3>
        {/* <ModalCommon /> */}
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
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
    </>
  );
};

export default ChangePassword;
