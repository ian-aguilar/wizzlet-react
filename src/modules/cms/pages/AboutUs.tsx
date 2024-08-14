import { Footer } from "../common/Footer";

import MissionImg from "/images/MissionImg.png";
import { Link } from "react-router-dom";

import { RightArrowGreen } from "@/assets/Svg";
import VisionImg from "/images/VisionImg.png";
import Button from "@/components/form-fields/components/Button";
import { aboutData, serviceData } from "@/constants";
import { btnShowType } from "@/components/form-fields/types";

const AboutUs = () => {
  return (
    <>
      <section className="bg-CMSPageTop bg-repeat-x">
        <div className="container">
          <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-20 text-center">
            <h1 className=" text-5xl md:text-6xl font-bold">Who we are?</h1>
            <p className=" font-normal text-xl text-grayText px-2 sm:px-8 lg:px-40  pt-6  ">
              "We are a passionate team of technology enthusiasts, industry
              experts, and business professionals dedicated to transforming the
              way businesses manage their inventory. With years of experience in
              the field, we understand the complexities and challenges of
              inventory management. Our goal is to provide innovative solutions
              that empower businesses to operate more efficiently, reduce costs,
              and improve overall productivity."
            </p>
            <Button
              showType={btnShowType.green}
              btnName="Sign Up Now "
              btnClass=" bg-greenPrimary border-greenPrimary text-white mx-auto mt-10 md:mt-16  w-auto"
            />
          </div>

          <div className="grid grid-cols-12 sm:gap-x-7 gap-y-7 mb-10  md:mb-36">
            {aboutData.map((data, i) => (
              <div
                className=" col-span-12 sm:col-span-6 p-9 border border-greyBorder/50 shadow-aboutBox rounded-xl"
                key={i}
              >
                <div className="flex md:flex-nowrap flex-wrap gap-5">
                  <div className="border border-dashed border-blackPrimary/50 inline-block p-1 w-12 h-12 min-w-12">
                    <img src={data.src} className="w-full h-full" alt="" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[26px] text-blackPrimary mb-2">
                      {data.h3}
                    </h3>
                    <p className="font-normal text-xl text-grayText ">
                      {data.p}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="visionSection bg-authPattern bg-[length:30px_30px] ">
        <div className="container md:py-24 py-10 block lg:flex justify-between items-center ">
          <div className="lg:w-[40%] mb-6">
            <h2 className=" text-4xl md:text-5xl font-bold text-blackPrimary  leading-tight pb-5">
              Our Vision
            </h2>
            <p className="text-grayText font-normal text-xl   ">
              Our vision is to become the leading provider of intelligent
              inventory management solutions worldwide. We aim to revolutionize
              the way businesses handle their inventory by leveraging
              cutting-edge technology, automation, and real-time data. We
              envision a future where every business, regardless of size, has
              the tools and insights needed to optimize their inventory
              processes and achieve sustainable growth.
            </p>
            <Button
              showType={btnShowType.green}
              btnName="Try For Free"
              btnClass="bg-greenPrimary text-white border-greenPrimary mt-8 w-auto"
            />
          </div>
          <div className="lg:w-[45%]">
            <div className="relative z-10 before:z-0 before:absolute  before:w-full  before:h-full  before:right-[-7px] before:bottom-[-7px]  before:bg-greenPrimary  before:rounded-md ">
              <img
                src={VisionImg}
                className="w-full h-auto rounded-md relative z-10"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ourMissionSection pt-10 md:pt-24 pb-10 md:pb-24 sm:px-0 px-4 ">
        <div className="container bg-grayText/5 border-greyBorder/50 border rounded-2xl py-14 md:py-24  px-4 md:px-32 text-center">
          <h2 className=" text-4xl md:text-5xl font-bold text-blackPrimary ">
            Our Mission{" "}
          </h2>
          <p className="text-xl font-normal text-grayText pt-6">
            Our mission is to simplify inventory management for businesses of
            all sizes. We strive to create user-friendly, powerful, and scalable
            solutions that address the unique needs of our customers. By
            continuously innovating and improving our offerings, we aim to help
            businesses reduce inefficiencies, enhance visibility, and make
            smarter inventory decisions.
          </p>
          <img
            className="w-full h-auto rounded-md mt-10 md:mt-12"
            src={MissionImg}
            alt=""
          />
        </div>
      </section>

      <section className="ourServicesSection pb-10 md:pb-24 ">
        <div className="container">
          <div className="titleContainer text-center px-4 md:px-40 mb-10 md:mb-16">
            <h2 className=" text-5xl md:text-[56px] font-bold text-blackPrimary leading-tight pb-6">
              What we provide?{" "}
            </h2>
            <p className="font-normal text-xl text-grayText">
              "Our vision is to become the leading provider of intelligent
              inventory management solutions worldwide. We aim to revolutionize
              the way businesses handle their inventory by leveraging
              cutting-edge technology, automation, and real-time data. We
              envision a future where every business, regardless of size, has
              the tools and insights needed to optimize their inventory
              processes and achieve sustainable growth."
            </p>
          </div>

          <div className="grid grid-cols-12 sm:gap-x-7 gap-y-7">
            {serviceData.map((data, i) => (
              <div
                className=" col-span-12 sm:col-span-6 md:col-span-4 p-8 border border-greyBorder rounded-xl flex flex-col "
                key={i}
              >
                <div className="border border-dashed border-blackPrimary/50 inline-block p-1 w-10 h-10">
                  <img src={data.src} className="w-full h-full" alt="" />
                </div>
                <h3 className="font-bold text-[22px] text-blackPrimary pt-5 line-clamp-1">
                  {data.h3}
                </h3>
                <p className="text-grayText mb-11 pt-2 line-clamp-3 ">
                  {data.p}
                </p>
                <Link
                  to=""
                  className="  group font-bold text-lg text-greenPrimary gap-2 inline-flex hover:brightness-110 transition-all duration-300 hover:transition-all hover:duration-300 items-center mt-auto  "
                >
                  Learn more{" "}
                  <RightArrowGreen className="ml-0 group-hover:ml-1 transition-all duration-300" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
