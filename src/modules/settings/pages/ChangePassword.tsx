// ** packages **
import { Controller, useForm } from "react-hook-form";

// ** common components **
import Button from "@/components/form-fields/components/Button";
import { TextLabel } from "@/components/common/TextLabel";

// **  types **
import { IChangePasswordInputs } from "../types";
import { EyeCloseIconSettings } from "@/assets/Svg";

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordInputs>();

  const onSubmit = (data: IChangePasswordInputs) => {
    console.log("setting change password", data);
  };

  return (
    <>
      <div className="w-full px-4 xl:px-20">
        <h3 className="text-2xl pb-2 text-blackPrimary border-b border-greyBorder  font-medium mb-4">
          Change Password
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="SettingsContentBox lg:pr-24 xl:pr-72 ">
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <TextLabel
                  TextClass=""
                  TextLabelName="Old Password"
                  TextPlaceHolder="*********"
                  control={control}
                  errors={errors}
                  type="password"
                  autoComplete="off"
                  TextEndIcon={<EyeCloseIconSettings />}
                  {...field}
                />
              )}
            />

            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextLabel
                  TextClass=" "
                  TextLabelName="New Password"
                  TextPlaceHolder="*********"
                  control={control}
                  errors={errors}
                  type="password"
                  autoComplete="off"
                  TextEndIcon={<EyeCloseIconSettings />}
                  {...field}
                />
              )}
            />

            <Controller
              name="confirmNewPassword"
              control={control}
              render={({ field }) => (
                <TextLabel
                  TextClass=""
                  TextLabelName="Re-type new password"
                  TextPlaceHolder="*********"
                  control={control}
                  errors={errors}
                  type="password"
                  autoComplete="off"
                  TextEndIcon={<EyeCloseIconSettings />}
                  {...field}
                />
              )}
            />
            <div className="pt-14">
              <Button
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

export default ChangePassword;
