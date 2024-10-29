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
import { useSelector } from "react-redux";
import { UserRole, userSelector } from "@/redux/slices/userSlice";
import FileField from "@/components/form-fields/components/FileField";
import { isArray } from "lodash";

const Profile = () => {
  const {
    control,
    handleSubmit,
    register,
    setError,
    setValue,
    clearErrors,
    watch,
    reset: ResetForm,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(profileValidationSchema),
    defaultValues: profileDefaultValue,
  });
  console.log(errors, "==============");

  // ================= Custom hooks ====================
  const { getProfileDataAPI } = useFetchProfileDataAPI();
  const { profileDataPostAPI, isLoading: loader } = useProfileDataPostAPI();

  const user = useSelector(userSelector);

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
        profileImage: data?.data?.url,
      });
    }
  };

  const onSubmit = async (payload: IFormInputs) => {
    const formData = new FormData();

    if (payload.contactNumber) {
      formData.append("contactNumber", payload.contactNumber.toString());
    }
    if (payload.organizationName) {
      formData.append("organizationName", payload.organizationName.toString());
    }
    formData.append("lastName", payload.lastName.toString());
    formData.append("firstName", payload.firstName.toString());
    formData.append("email", payload.email.toString());

    if (isArray(payload.profileImage) && payload.profileImage.length > 0) {
      payload.profileImage.forEach((file: File | Blob) => {
        if (file) {
          formData.append(`profileImage`, file);
        }
      });
    }

    await profileDataPostAPI(formData);
  };

  return (
    <>
      <div className="w-full px-4 xl:px-20">
        <h3 className="text-2xl pb-2 text-blackPrimary border-b border-greyBorder  font-medium mb-4">
          Profile
        </h3>
        {/* <ModalCommon /> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="SettingsContentBox    2xl:pr-72 ">
            <div className="grid grid-cols-12 lg:gap-4">
              <div className=" col-span-12 lg:col-span-6 row-span-3 ">
                <FileField
                  name="profileImage"
                  label="Profile Photo"
                  control={control}
                  errors={errors}
                  maxSize={8}
                  allowedFormat={["image/png", "image/jpeg"]}
                  register={register}
                  setError={setError}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  watch={watch}
                  isMulti={false}
                  MainclassName="  h-[20vh] max-h-[25vh] lg:max-h-[300px] lg:h-[95%] min-h-[20vh] lg:mb-0 mb-4"
                />
              </div>
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

              {user?.role === UserRole.USER && (
                <>
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
                </>
              )}
              <div className=" col-span-12 lg:col-span-6">
                <Input
                  textLabelName="Email"
                  control={control}
                  name="email"
                  errors={errors}
                  type="text"
                  isDisabled={true}
                />
              </div>
              {/* <div className="text-sm text-grayText  ">
              Do you want to change email?
              <Link
                to=""
                className="font-medium cursor-pointer text-greenPrimary inline-block ml-2 hover:underline hover:underline-offset-2 hover:brightness-110 transition-all duration-300 hover:transition-all hover:duration-300">
                Change
              </Link>
            </div> */}
            </div>
            <div className=" ">
              <Button
                showType={btnShowType.green}
                btnClass=" !w-auto !px-14 lg:!mt-14 "
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
