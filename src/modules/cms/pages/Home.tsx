// ** Packages **
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// **common components
import { Loader } from "@/components/common/Loader";
import Button from "@/components/form-fields/components/Button";
import { RightArrowLongIcon } from "@/assets/Svg";

// ** Types **
import { btnShowType } from "@/components/form-fields/types";
import { IForm } from "@/modules/Admin/Home/types";
import { RoutesPath } from "@/modules/Auth/types";

// ** Services **
import { usefetchHomeAPI } from "@/modules/Admin/Home/services/home.service";

const CMSHome = () => {
  const [homeData, setHomeData] = useState<IForm>();

  const navigate = useNavigate();

  const { getHomeAPI, isLoading } = usefetchHomeAPI();
  const getHomeData = async () => {
    const { data, error } = await getHomeAPI();
    if (!error && data) {
      console.log(data.data, "hjome data");

      setHomeData(data.data);
    }
  };
  useEffect(() => {
    getHomeData();
  }, []);
  return (
    <>
      {!isLoading && homeData ? (
        <>
          <section className="bg-CMSPageTop bg-repeat-x">
            <div className="container">
              <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-20 text-center">
                <Link
                  className="text-xl inline-flex gap-4 py-4 px-5 border border-dashed border-[#7062FE]/80 bg-[#7062FE]/5 rounded-md mb-8 items-center"
                  to=""
                >
                  {homeData.topSection.subtitle}
                  <RightArrowLongIcon className="!text-black w-5 min-w-5" />
                </Link>

                <h1 className="text-5xl md:text-6xl font-bold md:px-20 !leading-[70px]">
                  {homeData.topSection.title}
                </h1>
                <p className=" font-normal text-xl text-grayText px-2 sm:px-8 lg:px-40  pt-6  ">
                  {homeData.topSection.description}
                </p>
                <Button
                  showType={btnShowType.greenRound}
                  onClickHandler={() => navigate(RoutesPath.SignUp)}
                  btnName={homeData.topSection.greenButton}
                  btnClass="bg-greenPrimary border-greenPrimary text-white mx-auto mt-10 md:mt-16 !w-auto  "
                />
              </div>
            </div>
          </section>
          <section className="featuresSection">
            <div className="container">
              <div className="grid grid-cols-12 md:gap-x-4 gap-y-4  ">
                {homeData.topSection.feature.map((data, i) => {
                  const index = i;
                  return (
                    <div
                      className={`col-span-12 bg-grayLightBody/10  rounded-2xl flex flex-col ${
                        Math.ceil(index / 2) % 2 == 0 ||
                        (index != 1 && (index + 1) % 4 == 0)
                          ? "md:col-span-7"
                          : "md:col-span-5"
                      }`}
                    >
                      <div className="titleHolder p-10  text-center  md:text-left ">
                        <h3 className="font-bold text-[28px] text-blackPrimary pb-4  leading-relaxed  ">
                          {data.title}
                        </h3>
                        <p className="font-normal text-xl text-grayText ">
                          {data.description}
                        </p>
                      </div>
                      <div className="px-5 mt-auto">
                        <img
                          src={data.image as string}
                          className="w-full max-w-full h-auto"
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="HowWorks  mt-10 md:mt-40 ">
            <div className="container">
              <div className="titleHolder text-center">
                <h2 className=" text-5xl md:text-[56px] font-bold text-blackPrimary leading-tight pb-6 ">
                  {homeData.middleSection.title}
                </h2>
                <p className="text-grayText text-xl font-normal">
                  {" "}
                  {homeData.middleSection.description}
                </p>
              </div>
              <div className=" pt-10 sm:pt-20">
                <img
                  src={homeData.middleSection.image as string}
                  className="w-full max-w-full h-auto bg-cover"
                  alt=""
                />
              </div>
            </div>
          </section>

          <section className=" mt-10 md:mt-40 mb-10  md:mb-24  ">
            <div className="container">
              <div className="bg-CMSPageTile rounded-2xl sm:px-10 lg:px-56  py-7 lg:py-20 text-center border border-greyBorder/50 ">
                <h2 className=" text-5xl md:text-[56px] font-bold text-blackPrimary leading-tight ">
                  {homeData.bottomSection.title}
                </h2>
                <p className="  px-7 md:px-20 text-grayText text-xl font-normal pt-6 ">
                  {homeData.bottomSection.description}
                </p>
                <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center items-center pt-6 md:pt-12">
                  <Button
                    showType={btnShowType.greenRound}
                    btnClass=" border-greenPrimary bg-greenPrimary text-white "
                    btnName={homeData.bottomSection.greenButton}
                    onClickHandler={() => navigate(RoutesPath.SignUp)}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loader loaderClass="!h-[calc(100vh-103px)] !top-[103px] " />
      )}
    </>
  );
};

export default CMSHome;
