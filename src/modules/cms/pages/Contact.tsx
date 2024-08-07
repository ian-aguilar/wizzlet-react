import { Footer } from "../common/Footer";
import { InputText } from "../common/InputText";
import { Button } from "../common/Button";
import Header from "@/components/common/Header";

const Contact = () => {
  return (
    <>
      <Header type="cms" />
      <section className="bg-CMSPageTop bg-repeat-x">
        <div className="container">
          <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40 text-center">
            <h1 className=" text-5xl md:text-6xl font-bold">
              Let’s Get In Touch
            </h1>
            <p className=" font-normal text-xl text-grayText  px-2 sm:px-8 lg:px-40  pt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="FormSection lg:px-44 px-4 md:pb-36 pb-10 ">
            <div className="grid grid-cols-12 md:gap-x-7">
              <div className=" col-span-12 md:col-span-6">
                <InputText
                  inputPlaceholder="Enter"
                  inputLabel="Enter First Name *"
                />
              </div>
              <div className=" col-span-12 md:col-span-6">
                <InputText
                  inputPlaceholder="Enter"
                  inputLabel="Enter Last Name *"
                />
              </div>
              <div className=" col-span-12 md:col-span-6">
                <InputText
                  inputPlaceholder="Enter"
                  inputLabel="Enter Email Address *"
                />
              </div>
              <div className=" col-span-12 md:col-span-6">
                <InputText
                  inputPlaceholder="Enter"
                  inputLabel="Enter Phone Number *"
                />
              </div>
            </div>
            <InputText inputPlaceholder="Enter" inputLabel="Company Name *" />
            <InputText inputPlaceholder="Enter" inputLabel="Message *" />
            <div className="flex md:justify-end justify-center mt-10  md:mt-16 ">
              <Button
                showType="cms"
                btnClass=" bg-greenPrimary border-greenPrimary text-white "
                btnName="Send"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
