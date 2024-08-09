import { Footer } from "../common/Footer";
// import { InputText } from "../common/InputText";
// import { Button } from "../common/Button";
import Header from "@/components/common/Header";
import { btnShowType } from "@/components/form-fields/types";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/form-fields/components/Input";
import { IContactUs } from "../types/contactus";
import { ContactData } from "@/constants";
import Button from "@/components/form-fields/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactusValidation } from "../validation-schema/contactUsValidation";

const Contact = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IContactUs>({
    resolver: yupResolver(ContactusValidation),
  });

  const onSubmit: SubmitHandler<IContactUs> = (values) => {
    console.log("Setting contact us details", values);
  };
  return (
    <>
      <Header type="cms" />
      <section className="bg-CMSPageTop bg-repeat-x">
        <div className="container">
          <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40 text-center">
            <h1 className=" text-5xl md:text-6xl font-bold">{ContactData.title}</h1>
            <p className=" font-normal text-xl text-grayText  px-2 sm:px-8 lg:px-40  pt-6">
              {ContactData.description}
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
                  btnName={ContactData.greenButton}
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
