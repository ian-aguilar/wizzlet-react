// ** packages **
import { useForm } from "react-hook-form";

// ** common components **
import Button from "@/components/form-fields/components/Button";
import Input from "@/components/form-fields/components/Input";
import { btnShowType } from "@/components/form-fields/types";

// **  types **
import { IFormInputs } from "../types";
import { profileDefaultValue } from "@/constants";
import { useEffect } from "react";
import {
  useFetchProfileDataAPI,
  useProfileDataPostAPI,
} from "../services/profile.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileValidationSchema } from "../validation-schema/profileValidation";

const Profile = () => {
  const {
    control,
    handleSubmit,
    reset: ResetForm,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: profileDefaultValue,
  });

  // ================= Custom hooks ====================
  const { getProfileDataAPI } = useFetchProfileDataAPI();
  const { profileDataPostAPI, isLoading: loader } = useProfileDataPostAPI();

  useEffect(() => {
    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfileData = async () => {
    const { data, error } = await getProfileDataAPI({});

    if (!error && data) {
      ResetForm({
        firstName: data?.data?.first_name,
        lastName: data?.data?.last_name,
        organizationName: data?.data?.organization_name,
        contactNumber: data?.data?.contact_number,
        email: data?.data?.email,
      });
    }
  };

  const onSubmit = async (payload: IFormInputs) => {
    await profileDataPostAPI({
      firstName: payload.firstName,
      lastName: payload.lastName,
      organizationName: payload.organizationName,
      contactNumber: payload.contactNumber,
    });
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
                  placeholder="John"
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
                  placeholder="Doe"
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
                  placeholder="xyz"
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
              isDisabled={true}
            />
            {/* <div className="text-sm text-grayText  ">
              Do you want to change email?
              <Link
                to=""
                className="font-medium cursor-pointer text-greenPrimary inline-block ml-2 hover:underline hover:underline-offset-2 hover:brightness-110 transition-all duration-300 hover:transition-all hover:duration-300">
                Change
              </Link>
            </div> */}
            <div className="pt-14">
              <Button
                showType={btnShowType.green}
                btnClass=" !w-auto !px-14 "
                type="submit"
                btnName="Update"
                isLoading={loader}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
