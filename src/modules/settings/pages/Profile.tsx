// ** packages **
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// ** common components **
import Button from "@/components/form-fields/components/Button";

// **  types **
import { IFormInputs } from "../types";
import Input from "@/components/form-fields/components/Input";

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    console.log("setting sidebar", data);
  };

  return (
    <>
      <div className="w-full px-4 xl:px-20">
        <h3 className="text-2xl pb-2 text-blackPrimary border-b border-greyBorder  font-medium mb-4">
          Profile
        </h3>
        {/* <ModalCommon /> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="SettingsContentBox lg:pr-24 xl:pr-72 ">
            <div className="grid grid-cols-12 lg:gap-4">
              <div className=" col-span-12 lg:col-span-6">
                <Input
                  textLabelName="First Name"
                  control={control}
                  name="firstName"
                  errors={errors}
                  type="text"
                />
              </div>
              <div className=" col-span-12 lg:col-span-6">
                <Input
                  textLabelName="Last Name"
                  control={control}
                  name="lastName"
                  errors={errors}
                  type="text"
                />
              </div>
            </div>
            <div className="grid grid-cols-12 lg:gap-4">
              <div className=" col-span-12 lg:col-span-6">
                <Input
                  textLabelName="Organization Name"
                  control={control}
                  name="organizationName"
                  errors={errors}
                  type="text"
                />
              </div>
              <div className=" col-span-12 lg:col-span-6">
                <Input
                  textLabelName="Contact Number"
                  control={control}
                  name="contactNumber"
                  placeholder="1234567890"
                  errors={errors}
                  type="number"
                />
              </div>
            </div>

            <Input
              textLabelName="Email"
              control={control}
              name="email"
              errors={errors}
              type="text"
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
              <Button
                showType="App"
                btnClass=" !w-auto !px-14 "
                type="submit"
                btnName="Update"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
