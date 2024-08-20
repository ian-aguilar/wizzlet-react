import { Button } from "../common/Button";
import { btnShowType } from "@/components/form-fields/types";
import { Link } from "react-router-dom";
import { RightArrowLongIcon } from "@/assets/Svg";
import worksImg from "/images/howWorks.png";
import ImportImg from "/images/ImportExport_img.png";
import InventoryImg from "/images/InventoryMgt_img.png";
import UsersImg from "/images/UserFriendly_img.png";
import IntegrationImg from "/images/integrationImg.png";

const CMSHome = () => {
  return (
    <>
      {/* <ModalNav /> */}
      <section className="bg-CMSPageTop bg-repeat-x">
        <div className="container">
          <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-20 text-center">
            <Link
              className="text-xl inline-flex gap-4 py-4 px-5 border border-dashed border-[#7062FE]/80 bg-[#7062FE]/5 rounded-md mb-8 items-center"
              to=""
            >
              Importme’s New Features are Coming. Click here to know more{" "}
              <RightArrowLongIcon className=" !text-black w-5 min-w-5" />
            </Link>

            <h1 className=" text-5xl md:text-6xl font-bold">
              Expand your customer base by <br /> cross-listing for free using <br /> Importme
            </h1>
            <p className=" font-normal text-xl text-grayText px-2 sm:px-8 lg:px-40  pt-6  ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />{" "}
              incididunt ut labore et dolore magna aliqua.
            </p>
            <Button
              showType={btnShowType.green}
              btnName="Sign Up Now"
              btnClass="bg-greenPrimary border-greenPrimary text-white mx-auto mt-10 md:mt-16 !w-auto  "
            />
          </div>
        </div>
      </section>
      <section className="featuresSection">
        <div className="container">
          <div className="grid grid-cols-12 md:gap-x-4 gap-y-4  ">
            <div className=" col-span-12 md:col-span-7  bg-grayLightBody/10 rounded-2xl  flex flex-col  ">
              <div className="titleHolder p-10  text-center  md:text-left ">
                <h3 className="font-bold text-[28px] leading-relaxed text-blackPrimary pb-4 ">
                  Multi-Marketplace Integration
                </h3>
                <p className="font-normal text-xl text-grayText ">
                  Connect and manage your products across various <br /> marketplaces like Amazon,
                  eBay, Etsy, Shopify, and more.
                </p>
              </div>
              <div className="px-5 mt-auto">
                <img src={IntegrationImg} className="w-full max-w-full h-auto" alt="" />
              </div>
            </div>
            <div className=" col-span-12 md:col-span-5 bg-grayLightBody/10  rounded-2xl flex flex-col  ">
              <div className="titleHolder p-10  text-center  md:text-left ">
                <h3 className="font-bold text-[28px] text-blackPrimary pb-4  leading-relaxed  ">
                  Bulk Import and Export
                </h3>
                <p className="font-normal text-xl text-grayText ">
                  Effortlessly import or export large volumes of products with just a few clicks.
                </p>
              </div>
              <div className="px-5 mt-auto">
                <img src={ImportImg} className="w-full max-w-full h-auto" alt="" />
              </div>
            </div>
            <div className=" col-span-12 md:col-span-5 bg-grayLightBody/10  rounded-2xl flex flex-col   ">
              <div className="titleHolder p-10  text-center  md:text-left ">
                <h3 className="font-bold text-[28px] text-blackPrimary pb-4  leading-relaxed  ">
                  User-Friendly Dashboard
                </h3>
                <p className="font-normal text-xl text-grayText ">
                  Navigate through an intuitive dashboard that provides a comprehensive view of your
                  sales and inventory.
                </p>
              </div>
              <div className="px-5 mt-auto">
                <img src={UsersImg} className="w-full max-w-full h-auto" alt="" />
              </div>
            </div>
            <div className=" col-span-12 md:col-span-7  bg-grayLightBody/10 rounded-2xl  flex flex-col  ">
              <div className="titleHolder p-10  text-center  md:text-left ">
                <h3 className="font-bold text-[28px] text-blackPrimary pb-4  leading-relaxed ">
                  Real-Time Inventory Management
                </h3>
                <p className="font-normal text-xl text-grayText ">
                  Automatically update inventory levels across all <br /> connected platforms in
                  real-time.
                </p>
              </div>
              <div className="px-5 mt-auto">
                <img src={InventoryImg} className="w-full max-w-full h-auto" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="HowWorks  mt-10 md:mt-40 ">
        <div className="container">
          <div className="titleHolder text-center">
            <h2 className=" text-5xl md:text-[56px] font-bold text-blackPrimary leading-tight pb-6 ">
              How It Works
            </h2>
            <p className="text-grayText text-xl font-normal">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br />{" "}
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className=" pt-10 sm:pt-20">
            <img src={worksImg} className="w-full max-w-full h-auto bg-cover" alt="" />
          </div>
        </div>
      </section>

      <section className=" mt-10 md:mt-40 mb-10  md:mb-24  ">
        <div className="container">
          <div className="bg-CMSPageTile rounded-2xl sm:px-10 lg:px-56  py-7 lg:py-20 text-center border border-greyBorder/50 ">
            <h2 className=" text-5xl md:text-[56px] font-bold text-blackPrimary leading-tight ">
              {/* Take Control of Your Inventory Today */}
              Take Control of Your Inventory Today
            </h2>
            <p className="  px-7 md:px-20 text-grayText text-xl font-normal pt-6 ">
              {/* Experience the efficiency and precision of our inventory
                  management solution. Join thousands of satisfied customers who
                  have transformed their business operations with our intuitive,
                  powerful, and integrated system. */}
              Experience the efficiency and precision of our inventory management solution. Join
              thousands of satisfied customers who have transformed their business operations with
              our intuitive, powerful, and integrated system.
            </p>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center items-center pt-6 md:pt-12">
              <Button
                showType={btnShowType.green}
                btnClass=" border-greenPrimary bg-greenPrimary text-white "
                // btnName="Get Importme free"
                btnName="Get Importme free"
                // btnName={faqData.bottomSection.greenButton}
              />

              <Button
                showType={btnShowType.green}
                btnClass=" border-greyBorder bg-white  text-blackPrimary  "
                // btnName="Book a demo"
                btnName="Book a demo"
                // btnName={faqData.bottomSection.whiteButton}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CMSHome;
