import { Footer } from "../common/Footer";
// import { InputText } from "../common/InputText";
// import { Button } from "../common/Button";
import Header from "@/components/common/Header";
import { btnShowType } from "@/components/form-fields/types";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/form-fields/components/Input";
import { IContactUs } from "../types/contactus";
import Button from "@/components/form-fields/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactusValidation } from "../validation-schema/contactUsValidation";
import { useEffect, useState } from "react";
import { IContactusForm } from "@/modules/Admin/Contactus/types";
import {
  useGetContactusAPI,
  usePostContactusAPI,
} from "../services/cms.service";

const Contact = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IContactUs>({
    resolver: yupResolver(ContactusValidation),
  });

  const [contactus, setContactus] = useState<IContactusForm>();

  const { getContactusAPI } = useGetContactusAPI();
  const { postContactusAPI } = usePostContactusAPI();

  const fetchContactusData = async () => {
    const { data, error } = await getContactusAPI({});

    if (!error && data) {
      setContactus(data.data.data);
    }
  };

  useEffect(() => {
    fetchContactusData();
  }, []);

  const onSubmit: SubmitHandler<IContactUs> = async (values) => {
    const data = new FormData();

    data.append("firstName", values.firstName);
    data.append("lastName", values.lastName);
    data.append("email", values.email);
    if (values.phoneNo) {
      data.append("phoneNumber", values.phoneNo);
    }
    if (values.companyName) {
      data.append("companyName", values.companyName);
    }
    if (values.message) {
      data.append("message", values.message);
    }

    await postContactusAPI(data);
  };
  return (
    <>
      <Header type="cms" />
      <section className="bg-CMSPageTop bg-repeat-x">
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
                    placeholder="Enter First Name"
                    name="firstName"
                    textLabelName="First Name *"
                    type="text"
                    control={control}
                    errors={errors}
                    autoComplete={""}
                  />
                  {/* <InputText inputPlaceholder="Enter" inputLabel="Enter First Name *" /> */}
                </div>
                <div className=" col-span-12 md:col-span-6">
                  <Input
                    placeholder="Enter Last Name"
                    name="lastName"
                    textLabelName="Last Name *"
                    type="text"
                    control={control}
                    errors={errors}
                    autoComplete={""}
                  />
                  {/* <InputText inputPlaceholder="Enter" inputLabel="Enter Last Name *" /> */}
                </div>
                <div className=" col-span-12 md:col-span-6">
                  <Input
                    placeholder="Enter Email Address"
                    name="email"
                    textLabelName="Email Address *"
                    type="text"
                    control={control}
                    errors={errors}
                    autoComplete={""}
                  />
                  {/* <InputText inputPlaceholder="Enter" inputLabel="Enter Email Address *" /> */}
                </div>
                <div className=" col-span-12 md:col-span-6">
                  <Input
                    placeholder="Enter Phone Number"
                    name="phoneNo"
                    textLabelName="Phone Number"
                    type="text"
                    control={control}
                    errors={errors}
                    autoComplete={""}
                  />
                  {/* <InputText inputPlaceholder="Enter" inputLabel="Enter Phone Number *" /> */}
                </div>
              </div>
              <Input
                placeholder="Enter Company Name"
                name="companyName"
                textLabelName="Company Name"
                type="text"
                control={control}
                errors={errors}
                autoComplete={""}
              />
              {/* <InputText inputPlaceholder="Enter" inputLabel="Company Name *" /> */}
              <Input
                placeholder="Enter Message"
                name="message"
                textLabelName="Message"
                type="text"
                control={control}
                errors={errors}
                autoComplete={""}
              />
              {/* <InputText inputPlaceholder="Enter" inputLabel="Message *" /> */}
              <div className="flex md:justify-end justify-center mt-10  md:mt-16 ">
                {/* <Button
                showType={btnShowType.green}
                btnClass=" bg-greenPrimary border-greenPrimary text-white "
                btnName={ContactData.greenButton}
                /> */}
                <Button
                  showType={btnShowType.green}
                  btnClass="bg-greenPrimary border-greenPrimary text-white"
                  btnName={contactus?.greenButton as string}
                  type="submit"
                />
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
