// ** packages **
import { useForm } from "react-hook-form";

// ** common components **
import Button from "@/components/form-fields/components/Button";
import Input from "@/components/form-fields/components/Input";
import { btnShowType } from "@/components/form-fields/types";

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
            <Input
              className=""
              textLabelName="Old Password"
              name="oldPassword"
              placeholder="*********"
              control={control}
              errors={errors}
              type="password"
              autoComplete="off"
              inputEndIcon={<EyeCloseIconSettings />}
            />
            <Input
              className=""
              textLabelName="New Password"
              name="newPassword"
              placeholder="*********"
              control={control}
              errors={errors}
              type="password"
              autoComplete="off"
              inputEndIcon={<EyeCloseIconSettings />}
            />
            <Input
              className=""
              textLabelName="Re-type new password"
              name="confirmNewPassword"
              placeholder="*********"
              control={control}
              errors={errors}
              type="password"
              autoComplete="off"
              inputEndIcon={<EyeCloseIconSettings />}
            />
            <div className="pt-14">
              <Button
                showType={btnShowType.green}
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
