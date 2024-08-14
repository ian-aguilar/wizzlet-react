import { Footer } from "../common/Footer";
import { Button } from "../common/Button";
import { FaqData } from "@/constants";
import { btnShowType } from "@/components/form-fields/types";

const Faqs = () => {
  return (
    <>
      <section className="bg-CMSPageTop bg-repeat-x">
        <div className="container">
          <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40 text-center">
            <h1 className=" text-5xl md:text-6xl font-bold">
              Frequently asked questions
            </h1>
            <p className=" font-normal text-xl text-grayText  px-2 sm:px-4 lg:px-40  pt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="faqWithAnswers">
            {FaqData.map((data, i) => (
              <div
                className="border-t border-b border-greyBorder py-7 mb-7 md:flex justify-between items-start"
                key={i}
              >
                <div className="flex gap-3 items-start md:w-[42%]">
                  <div className="font-bold text-greenPrimary text-[26px] min-w-9 w-9">
                    {data.count}
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
              Take Control of Your Inventory Today
            </h2>
            <p className="  px-7 md:px-20 text-grayText text-xl font-normal pt-6 ">
              Experience the efficiency and precision of our inventory
              management solution. Join thousands of satisfied customers who
              have transformed their business operations with our intuitive,
              powerful, and integrated system.
            </p>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center items-center pt-6 md:pt-12">
              <Button
                showType={btnShowType.green}
                btnClass=" border-greenPrimary bg-greenPrimary text-white "
                btnName="Get Importme free"
              />

              <Button
                showType={btnShowType.green}
                btnClass=" border-greyBorder bg-white  text-blackPrimary  "
                btnName="Book a demo"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Faqs;
