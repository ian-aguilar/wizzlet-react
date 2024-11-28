// ** Packages **
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// ** Common **
import Button from "@/components/form-fields/components/Button";
import Input from "@/components/form-fields/components/Input";
import TextArea from "@/components/form-fields/components/TextArea";

// ** Validation **
import { btnShowType } from "@/components/form-fields/types";
import { IContactUs } from "../types/contactus";
import { yupResolver } from "@hookform/resolvers/yup";
import { IContactusForm } from "@/modules/Admin/Contactus/types";
import { ContactusValidation } from "../validation-schema/contactUsValidation";

// ** Services **
import {
  useGetContactusAPI,
  usePostContactusAPI,
} from "../services/cms.service";
import { Loader } from "@/components/common/Loader";

const Contact = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IContactUs>({
    resolver: yupResolver(ContactusValidation),
  });

  const [contactus, setContactus] = useState<IContactusForm>();

  const { getContactusAPI, isLoading: dataLoading } = useGetContactusAPI();
  const { postContactusAPI, isLoading: updateLoading } = usePostContactusAPI();

  const fetchContactusData = async () => {
    const { data, error } = await getContactusAPI({});

    if (!error && data) {
      setContactus(data?.data);
    }
  };

  useEffect(() => {
    fetchContactusData();
  }, []);

  const onSubmit: SubmitHandler<IContactUs> = async (values) => {
    const data = new FormData();

    data.append("first_name", values.firstName);
    data.append("last_name", values.lastName);
    data.append("email", values.email);
    if (values.phoneNo) {
      data.append("phone_number", values.phoneNo);
    }
    if (values.companyName) {
      data.append("company_name", values.companyName);
    }
    if (values.message) {
      data.append("message", values.message);
    }

    const response = await postContactusAPI(data);

    if (response?.data && !response?.error) {
      reset({});
    }
  };
  return (
    <>
      <section className="bg-CMSPageTop bg-repeat-x">
        {!dataLoading ? (
          <div className="container">
            <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40 text-center">
              <h1 className=" text-5xl md:text-6xl font-bold">
                {contactus?.title}
              </h1>
              <p className=" font-normal text-xl text-grayText  px-2 sm:px-8 lg:px-40  pt-6">
                {contactus?.description}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="FormSection lg:px-44 px-4 md:pb-36 pb-10 ">
                <div className="grid grid-cols-12 md:gap-x-7">
                  <div className=" col-span-12 md:col-span-6">
                    <Input
                      className=" !border-b-2 !border-[#E1E8EF] !bg-white focus:outline-0 outline-0 rounded-none px-0"
                      placeholder="Enter First Name"
                      name="firstName"
                      textLabelName="First Name *"
                      type="text"
                      control={control}
                      errors={errors}
                      autoComplete={""}
                    />
                  </div>
                  <div className=" col-span-12 md:col-span-6">
                    <Input
                      className=" !border-b-2 !border-[#E1E8EF] !bg-white focus:outline-0 outline-0 rounded-none px-0"
                      placeholder="Enter Last Name"
                      name="lastName"
                      textLabelName="Last Name *"
                      type="text"
                      control={control}
                      errors={errors}
                      autoComplete={""}
                    />
                  </div>
                  <div className=" col-span-12 md:col-span-6">
                    <Input
                      className=" !border-b-2 !border-[#E1E8EF] !bg-white focus:outline-0 outline-0 rounded-none px-0"
                      placeholder="Enter Email Address"
                      name="email"
                      textLabelName="Email Address *"
                      type="text"
                      control={control}
                      errors={errors}
                      autoComplete={""}
                    />
                  </div>
                  <div className=" col-span-12 md:col-span-6">
                    <Input
                      className=" !border-b-2 !border-[#E1E8EF] !bg-white focus:outline-0 outline-0 rounded-none px-0"
                      placeholder="Enter 10 Digit Phone Number"
                      name="phoneNo"
                      textLabelName="Phone Number"
                      type="number"
                      control={control}
                      errors={errors}
                      autoComplete={""}
                    />
                  </div>
                </div>
                <Input
                  className=" !border-b-2 !border-[#E1E8EF] !bg-white focus:outline-0 outline-0 rounded-none px-0"
                  placeholder="Enter Company Name"
                  name="companyName"
                  textLabelName="Company Name"
                  type="text"
                  control={control}
                  errors={errors}
                  autoComplete={""}
                />
                <TextArea
                  className=" !border-b-2 !border-[#E1E8EF] !bg-white focus:outline-0 outline-0 rounded-none px-0"
                  placeholder="Enter Message"
                  name="message"
                  textLabelName="Message"
                  control={control}
                  errors={errors}
                  autoComplete={""}
                />
                <div className="flex md:justify-end justify-center mt-10  md:mt-16 ">
                  <Button
                    showType={btnShowType.greenRound}
                    btnClass="bg-greenPrimary border-greenPrimary text-white"
                    btnName={contactus?.greenButton as string}
                    type="submit"
                    isLoading={updateLoading}
                  />
                </div>
              </div>
            </form>
          </div>
        ) : (
          <Loader loaderClass="lg:!h-[calc(100vh-103px)] lg:!top-[103px] " />
        )}
      </section>
    </>
  );
};

export default Contact;
