// ** Packages **
import { useEffect, useState } from "react";
import { Footer } from "../common/Footer";

// ** Common **
import Header from "@/components/common/Header";
import Button from "@/components/form-fields/components/Button";
import { btnShowType } from "@/components/form-fields/types";
import { VITE_APP_API_URL } from "@/config";

// ** Types **
import { IAboutusForm } from "@/modules/Admin/Aboutus/types";

// ** Services **
import { useGetAboutusAPI } from "../services/cms.service";

const AboutUs = () => {
  const [aboutus, setAboutus] = useState<IAboutusForm>();

  const { getAboutusAPI } = useGetAboutusAPI();

  useEffect(() => {
    fetchAboutusData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAboutusData = async () => {
    const { data, error } = await getAboutusAPI({});

    if (!error && data) {
      setAboutus(data?.data);
    }
  };

  return (
    <>
      <Header type="cms" />
      <section className="bg-CMSPageTop bg-repeat-x">
        <div className="container">
          <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-20 text-center">
            <h1 className=" text-5xl md:text-6xl font-bold">{aboutus?.topSection.heading}</h1>
            <p className=" font-normal text-xl text-grayText px-2 sm:px-8 lg:px-40  pt-6  ">
              {aboutus?.topSection.description}
            </p>
            <Button
              showType={btnShowType.green}
              btnName={aboutus?.topSection.greenButton as string}
              btnClass="bg-greenPrimary border-greenPrimary text-white mx-auto mt-10 md:mt-16  "
            />
          </div>
          <div className="grid grid-cols-12 sm:gap-x-7 gap-y-7 mb-10  md:mb-36">
            {aboutus?.topSection.cards.map((data, i) => (
              <div
                className=" col-span-12 sm:col-span-6 p-9 border border-greyBorder/50 shadow-aboutBox rounded-xl"
                key={i}
              >
                <div className="flex md:flex-nowrap flex-wrap gap-5">
                  <div className="border border-dashed border-blackPrimary/50 inline-block p-1 w-12 h-12 min-w-12">
                    <img
                      src={(VITE_APP_API_URL + data.icon) as string}
                      className="w-full h-full"
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[26px] text-blackPrimary mb-2">
                      {data.title}
                    </h3>
                    <p className="font-normal text-xl text-grayText ">{data.description}</p>
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
              {aboutus?.visionSection.title}
            </h2>
            <p className="text-grayText font-normal text-xl   ">
              {aboutus?.visionSection.description}
            </p>
            <Button
              showType={btnShowType.green}
              btnName={aboutus?.visionSection.greenButton as string}
              btnClass="bg-greenPrimary text-white border-greenPrimary mt-8"
            />
          </div>
          <div className="lg:w-[45%]">
            <div className="relative z-10 before:z-0 before:absolute  before:w-full  before:h-full  before:right-[-7px] before:bottom-[-7px]  before:bg-greenPrimary  before:rounded-md ">
              <img
                src={(VITE_APP_API_URL + aboutus?.visionSection.image) as string}
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
            {aboutus?.missionSection.title}
          </h2>
          <p className="text-xl font-normal text-grayText pt-6">
            {aboutus?.missionSection.description}
          </p>
          <img
            className="w-full h-auto rounded-md mt-10 md:mt-12"
            src={(VITE_APP_API_URL + aboutus?.missionSection.image) as string}
            alt=""
          />
        </div>
      </section>

      <section className="ourServicesSection pb-10 md:pb-24 ">
        <div className="container">
          <div className="titleContainer text-center px-4 md:px-40 mb-10 md:mb-16">
            <h2 className=" text-5xl md:text-[56px] font-bold text-blackPrimary leading-tight pb-6">
              {aboutus?.serviceSection.title}
            </h2>
            <p className="font-normal text-xl text-grayText">
              {aboutus?.serviceSection.description}
            </p>
          </div>

          <div className="grid grid-cols-12 sm:gap-x-7 gap-y-7">
            {aboutus?.serviceSection.cards.map((data, i) => (
              <div
                className=" col-span-12 sm:col-span-6 md:col-span-4 p-8 border border-greyBorder rounded-xl flex flex-col "
                key={i}
              >
                <div className="border border-dashed border-blackPrimary/50 inline-block p-1 w-10 h-10">
                  <img
                    src={(VITE_APP_API_URL + data.icon) as string}
                    className="w-full h-full"
                    alt=""
                  />
                </div>
                <h3 className="font-bold text-[22px] text-blackPrimary pt-5 line-clamp-1">
                  {data.title}
                </h3>
                <p className="text-grayText mb-11 pt-2 line-clamp-3 ">{data.description}</p>
                {/* <Link
                  to=""
                  className="  group font-bold text-lg text-greenPrimary gap-2 inline-flex hover:brightness-110 transition-all duration-300 hover:transition-all hover:duration-300 items-center mt-auto  "
                >
                  Learn more{" "}
                  <RightArrowGreen className="ml-0 group-hover:ml-1 transition-all duration-300" />
                </Link> */}
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
