// ** Packages **
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Types **
import { IForm } from "@/modules/Admin/Faq/types";
import { btnShowType } from "@/components/form-fields/types";
import { RoutesPath } from "@/modules/Auth/types";

// **common components
import Button from "@/components/form-fields/components/Button";
import { Loader } from "@/components/common/Loader";

// ** Services **
import { usefetchFaqAPI } from "../../Admin/Faq/services/faq.service";

const Faqs = () => {
  const [faqData, setFaqData] = useState<IForm>();

  const navigate = useNavigate();

  const { getFaqAPI, isLoading } = usefetchFaqAPI();
  const getFaqData = async () => {
    const { data, error } = await getFaqAPI();
    if (!error && data) {
      setFaqData(data.data);
    }
  };
  useEffect(() => {
    getFaqData();
  }, []);
  return (
    <>
      {!isLoading && faqData ? (
        <>
          <section className="bg-CMSPageTop bg-repeat-x">
            <div className="container">
              <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40 text-center">
                <h1 className=" text-5xl md:text-6xl font-bold">
                  {faqData.topSection.title}
                </h1>
                <p className=" font-normal text-xl text-grayText  px-2 sm:px-4 lg:px-40  pt-6">
                  {faqData.topSection.description}
                </p>
              </div>

              <div className="faqWithAnswers">
                {faqData.topSection.row.map((data, i) => (
                  <div
                    className="border-t border-b border-greyBorder py-7 mb-7 md:flex justify-between items-start"
                    key={i}
                  >
                    <div className="flex gap-3 items-start md:w-[42%]">
                      <div className="font-bold text-greenPrimary text-[26px] min-w-9 w-9">
                        {i < 9 ? `0${i + 1}` : i + 1}
                      </div>
                      <div className="font-medium text-2xl text-blackPrimary">
                        {data.question}
                      </div>
                    </div>
                    <span className="md:w-[56%] font-normal text-grayText text-lg md:pl-0 pl-11 block">
                      {data.answer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className=" mt-10 md:mt-40 mb-10  md:mb-24  ">
            <div className="container">
              <div className="bg-CMSPageTile rounded-2xl sm:px-10 lg:px-56  py-7 lg:py-20 text-center border border-greyBorder/50 ">
                <h2 className=" text-5xl md:text-[56px] font-bold text-blackPrimary leading-tight ">
                  {faqData.bottomSection.title}
                </h2>
                <p className="  px-7 md:px-20 text-grayText text-xl font-normal pt-6 ">
                  {faqData.bottomSection.description}
                </p>
                <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center items-center pt-6 md:pt-12">
                  <Button
                    showType={btnShowType.greenRound}
                    btnName={faqData.bottomSection.greenButton}
                    btnClass="border-greenPrimary bg-greenPrimary text-white"
                    onClickHandler={() => navigate(RoutesPath.SignUp)}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loader loaderClass="lg:!h-[calc(100vh-103px)] lg:!top-[103px] " />
      )}
    </>
  );
};

export default Faqs;
