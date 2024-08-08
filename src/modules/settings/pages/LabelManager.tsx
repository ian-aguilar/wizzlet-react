import PlaceHoledrImg from "/images/VisionImg.png";
import MArketPlaceImg from "/images/Amazon_logo.png";
import MArketPlaceImg2 from "/images/ebay_logo.png";
import {
  AddIconBtn,
  DeleteIcon,
  EditLabelIcon,
  EyeIconSettings,
  LeftArrowIcon,
} from "@/assets/Svg";

import Button from "@/components/form-fields/components/Button";
import { Link } from "react-router-dom";
import { TextLabel } from "@/components/common/TextLabel";
import { ModalError } from "@/components/common/ModalError";

const LabelManager = () => {
  return (
    <>
      <ModalError />
      <div className=" border-b border-greyBorder flex   items-center gap-4  flex-wrap pb-2 mb-4">
        <span className="border p-1 rounded-full cursor-pointer ">
          <LeftArrowIcon />
        </span>
        <h3 className="text-2xl   text-blackPrimary font-medium  ">
          Label Manager
        </h3>
        <span className="inline-block bg-greenPrimary/10 text-greenPrimary text-sm px-2 py-1">
          {" "}
          Cloth{" "}
        </span>
      </div>
      <div className="flex justify-between items-center gap-6 flex-wrap py-7">
        <div>
          {/* <TextLabel TextClass="" TextEndIcon="" name="name" /> */} search{" "}
        </div>
        <div>Show 5 entries </div>
      </div>
      <div className="labelMAnagerBox bg-grayLightBody/10 p-5 xl:flex block xl:gap-4 xl:space-y-0 space-y-4 mb-4">
        <div className="min-w-[171px] w-[171px] h-[132px]  ">
          <img
            src={PlaceHoledrImg}
            className="w-full h-full object-cover rounded-md "
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between relative w-full">
          <div className="absolute right-1 top-1 flex gap-2">
            <div>
              <EditLabelIcon className="text-grayLightBody cursor-pointer" />
            </div>
            <div>
              <DeleteIcon className="text-red-600 cursor-pointer" />
            </div>
          </div>
          <h4 className="font-medium text-xl text-blackPrimary me-20 line-clamp-1">
            Nike Air Max 1 Essential Men's Shoes
          </h4>
          <div className="inline-flex gap-4 flex-wrap">
            <div className="listItems">
              <p className="uppercase text-grayText text-sm font-normal">
                Price{" "}
              </p>
              <span className=" text-sm font-medium text-black">$59</span>
            </div>
            <div className="border-r border-dashed border-r-grayLightBody/50">
              {" "}
              &nbsp;{" "}
            </div>
            <div className="listItems">
              <p className="uppercase text-grayText text-sm font-normal">
                Date{" "}
              </p>
              <span className=" text-sm font-medium text-black">
                15 May 2020
              </span>
            </div>
            <div className="border-r  border-dashed border-r-grayLightBody/50">
              {" "}
              &nbsp;{" "}
            </div>
            <div className="listItems">
              <p className="uppercase text-grayText text-sm font-normal">
                Qty{" "}
              </p>
              <span className=" text-sm font-medium text-black">4</span>
            </div>
            <div className="border-r  border-dashed border-r-grayLightBody/50">
              {" "}
              &nbsp;{" "}
            </div>
            <div className="listItems">
              <p className="uppercase text-grayText text-sm font-normal">
                sku{" "}
              </p>
              <span className=" text-sm font-medium text-black">H1255</span>
            </div>
          </div>
          <div className="UploadedOn flex gap-2 items-center">
            <div className="bg-white p-1 border rounded-sm">
              {" "}
              <img
                src={MArketPlaceImg}
                className="max-w-[40px] w-[40px] h-auto "
                alt=""
              />{" "}
            </div>
            <div className="bg-white p-1 border rounded-sm">
              {" "}
              <img
                src={MArketPlaceImg2}
                className="max-w-[40px] w-[40px] h-auto "
                alt=""
              />{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="BottomFooterLabelMAnager flex justify-between items-center gap-10 flex-wrap pt-8 pb-6">
        <div className="text-grayLightBody">Showing 1 to 5 Reviews</div>
        <div className="flex gap-1 bg-grayLightBody/10 py-1 px-1 rounded-md ">
          <Link
            className="w-9 h-9 min-w-9 rounded-md hover:bg-greenPrimary/10 flex justify-center items-center  "
            to=""
          >
            <LeftArrowIcon />
          </Link>
          <Link
            to=""
            className="w-9 h-9 min-w-9 rounded-md bg-greenPrimary flex justify-center items-center text-white"
          >
            1
          </Link>
          <Link
            to=""
            className="w-9 h-9 min-w-9 rounded-md hover:bg-greenPrimary/10 flex justify-center items-center  "
          >
            2
          </Link>
          <Link
            to=""
            className="w-9 h-9 min-w-9 rounded-md hover:bg-greenPrimary/10 flex justify-center items-center  "
          >
            3
          </Link>
          <Link
            to=""
            className="w-9 h-9 min-w-9 rounded-md hover:bg-greenPrimary/10 flex justify-center items-center  "
          >
            4
          </Link>
          <Link
            to=""
            className="w-9 h-9 min-w-9 rounded-md hover:bg-greenPrimary/10 flex justify-center items-center  "
          >
            5
          </Link>
          <Link
            className="w-9 h-9 min-w-9 rounded-md hover:bg-greenPrimary/10 flex justify-center items-center  "
            to=""
          >
            <LeftArrowIcon className="rotate-180" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LabelManager;
